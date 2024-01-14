const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const bankingAccountSchema = new mongoose.Schema({
  bankName: { type: String, required: true},
  bankAccount: { type: String, required: true},
  bankHolder: { type: String, required: true},
  bookingID: { type: ObjectId, required: true},
});

const BankingAccount = mongoose.model("bankingAccount", bankingAccountSchema);

module.exports = BankingAccount;
