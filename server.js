let express = require("express");
let app = express();

let cors = require("cors");
const User = require("./model/user");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
app.use(morgan("dev"));
(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tp");
  } catch (err) {
    console.log("error: " + err);
  }
})();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Truely pride server is running");
});

app.post("/signup", async (req, res) => {
  const { username, name, password } = req.body;

  let user = new User({
    username,
    name,
    password,
    deet1: "",
    deet2: "",
    deet3: "",
    quote: "",
    dp: "",
    gender: "",
    aboutme: "",
  });
  await user.save();
  res.send({ status: "ok" });
});

app.post("/update", async (req, res) => {
  const { username, deet1, deet2, aboutme, quote, dp, gender, deet3 } =
    req.body;
  console.log(username);
  let user = await User.findOne({ username });
  user.deet1 = deet1;
  user.deet2 = deet2;
  user.aboutme = aboutme;
  user.quote = quote;
  user.dp = dp;
  user.gender = gender;
  user.deet3 = deet3;

  await user.save();
  res.send({ status: "ok" });
});
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  let user = new User({ username });
  if (user && user.password === password) res.send({ status: "ok" });
  else res.send({ status: "notok" });
});

app.get("/allusers", async (req, res) => {
  res.send(await User.find({}));
});
app.post("/getuser", async (req, res) => {
  const { username } = req.body;
  res.send(await User.findOne({ username }));
});

app.post("/mysparks", async (req, res) => {
  const { username } = req.body;
  let user = await User.findOne({ username });
  let user2 = await User.find({ username: user.sparks });
  res.send({ status: "ok", payload: user2 });
});

app.post("/spark", async (req, res) => {
  const { username, spark } = req.body;
  let user = await User.findOne({ username });
  user.sparks.push(spark);
  await user.save();
  let user2 = await User.findOne({ spark });
  user2.sparks.push(username);
  await user2.save();
  res.send({ status: "ok" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
