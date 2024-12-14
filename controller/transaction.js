const Transaction = require('../model/transaction')
const Account = require('../model/account')
const User = require('../model/user')
const crypto = require('crypto');
const {sendmail} = require('../config/utils')
const {generateFourDigitCode} = require('../config/utils')
const bcrypt = require('bcrypt')


exports.deposit = async(req, res)=>{
 
     const {amount, description} = req.body
     const user = req.user.id;
     console.log(user)
     try{
      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Deposit amount must be greater than zero' });
    }

    if (description && typeof description !== 'string') {
      return res.status(400).json({ message: 'Invalid description' });
  }
          const userAccount = await User.findById(user)
        if (!userAccount) {
          return res.status(404).json({ message: 'user not found' });
      }

      const account = await Account.findOne({ user });

      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }

        const code = generateFourDigitCode()
        const hashedOTP = bcrypt.hashSync(String(code), 10)

        await sendmail({
          email: userAccount.email,
          subject: 'Your OTP for Deposit Verification',
          message: `Your OTP for deposit verification is: ${code}`, 
      });
            const newTransaction = new Transaction({
            amount:amount,
            description:description,
            transactionType:'deposit',
            otp:hashedOTP,
            status:'pending',
            account:account._id
            })


            
         
        
        await newTransaction.save()
        res.status(201).json({
          msg:'pending verify transaction ',
          transactionId: newTransaction._id
        });
        }

      catch(error){
        res.status(500).json({ message: error.message });
     }


    }


    exports.verify = async(req, res) => {
      const userId = req.user.id
      const {otp} = req.body
    

      let transaction
      try{ 
       
        const userAccount = await Account.findOne({ user: userId });
        if (!userAccount) {
          return res.status(404).json({ message: 'Account not found' });
      }
       
       transaction = await Transaction.findOne({ account: userAccount._id, status: 'pending' });
      if (!transaction) {
          return res.status(404).json({ message: 'Transaction not found or already processed' });
      }


      const isOtpValid = bcrypt.compareSync(otp, transaction.otp);
        if (!isOtpValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

     userAccount.balance += transaction.amount
      transaction.otp=undefined
      transaction.status='completed'
      await transaction.save()
      await userAccount.save()

      res.status(200).json({
        msg:'transaction successful',
      
      })

      }catch(error){

        if (transaction) {
          // Mark transaction as failed if it exists
          transaction.status = 'failed';
          transaction.otp=undefined
          transaction.failureReason = error.message || 'Unknown error occurred';
          await transaction.save();
      }
      res.status(500).json({
        message: 'Transaction failed',
        error: error.message,
    });
      }
    }


  
// Transfer function
exports.transfer = async (req, res) => {
  const { pin } = req.body;
  const { fromAccount, toAccount, amount, newTransaction, description } = req.transaction;

  try {
      // Validate PIN
      const isPinValid = bcrypt.compareSync(pin, fromAccount.pin);
      if (!isPinValid) {
          return res.status(403).json({ message: "Invalid PIN" });
      }

      // Deduct amount from sender's account
      fromAccount.balance -= amount;

      // Credit amount to recipient's account
      toAccount.balance += amount;

      // Update transaction
       newTransaction.status='completed'
         
  
      await newTransaction.save();

      // Save updated account balances
      await Promise.all([fromAccount.save(), toAccount.save()]);

      // Send email notification
      try {
          await sendmail({
              email: toAccount.email,
              message: `Your account has been credited with ${amount} by ${fromAccount.accountNumber}.`,
          });
      } catch (emailError) {
          console.error("Email notification failed:", emailError.message);
      }

      res.status(200).json({
          message: "Transfer successful",
          transaction: newTransaction,
      });
  } catch (error) {
      // Rollback balances on failure
      if (fromAccount && toAccount) {
          fromAccount.balance += amount;
          toAccount.balance -= amount;
      }

      // Mark transaction as failed
      newTransaction.status='completed'
     
      await newTransaction.save();

      res.status(500).json({ message: `Transfer failed: ${error.message}` });
  }
};
