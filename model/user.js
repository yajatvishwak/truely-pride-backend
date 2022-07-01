const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  dp: { type: String },
  password: { type: String, required: true },
  gender: String,
  aboutme: String,
  deet1: String,
  deet2: String,
  deet3: String,
  quote: String,
  name: String,
  sparks: [String], // [username]
});

module.exports = mongoose.model("user", UserSchema);
