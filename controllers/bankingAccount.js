const express = require("express");
const router = express.Router();

const BankingAccount = require("../models/bankingAccount");

router.get("/", async (req, res) => {
  const accounts = await BankingAccount.find();
  res.json(accounts);
});

router.get("/booking", async (req, res) => {
  const id = req.query.bookingID;
  try {
    const account = await BankingAccount.findOne({bookingID : id });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// router.get("/booking", async (req, res) => {
//   const bookingEmail  = req.query.bookingEmail;
//   const bookingDate  = req.query.bookingDate;
//   const children = await BankingAccount.find({ bookingEmail, bookingDate });
//   res.json(children);
// });

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