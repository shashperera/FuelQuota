<<<<<<< HEAD
// const mongoose = require("mongoose");
//
// const userSchema = new mongoose.Schema({
//   first_name: { type: String, default: null },
//   last_name: { type: String, default: null },
//   email: { type: String, unique: true },
//   password: { type: String },
// });
//
// module.exports = mongoose.model("user", userSchema);
=======
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
});

module.exports = mongoose.model("user", userSchema);
>>>>>>> 8eb6d24c62db33d2cd33571d6fd0723f14d83b13
