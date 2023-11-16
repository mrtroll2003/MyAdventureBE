const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
