const express = require("express");
const router = express.Router();

const BankingAccount = require("../models/bankingAccount");

router.get("/", async (req, res) => {
  const accounts = await BankingAccount.find();
  res.json(accounts);
});

router.post("/add", async (req, res) => {
    try {
        const bankAccount = req.body.bankAccount;
        const bankName = req.body.bankName;
        const bankHolder = req.body.bankHolder;
        const bookingID = req.body.bookingID;

        const account = new BankingAccount({
          bankAccount,
          bankName,
          bankHolder,
          bookingID,
        })

        await account.save();
        res.json({ success: true, account });
    } catch (error) {
      res.status(400).json({
        error
      });
}})

module.exports = router;