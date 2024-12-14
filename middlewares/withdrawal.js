const Transaction = require('../model/transaction')
const Account = require('../model/account')



exports.withdrawal = async (req, res, next) => {
        
    const {amount, accountNumber, description} = req.body
    const accountId = req.user.id;
   try{
    const fromAccount = await Account.findOne({user:accountId})
        if(!fromAccount) throw new Error ("Account dos not exist")

    const toAccount = await Account.findOne({accountNumber})
    if(!toAccount){
        res.status(404).json({message:'Account not found'})
    }

     const newTransaction = new Transaction({
        amount,
        transactionType:'transfer',
        account:fromAccount._id

     })
     await newTransaction.save()
     req.transaction = {toAccount, newTransaction, amount, fromAccount, description}
     next()

   }catch(error){
    res.status(500).json({ message: `Transfer failed: ${error.message}` });
   }
  
}