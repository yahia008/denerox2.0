const Account = require('../model/account')



exports.search = async(req, res) => {
    const {accountNumber} = req.body

   try{
    const account = await Account.findOne({accountNumber})
    if(!account) res.status(404).json({msg:'user does not exist'})
    res.status(200).json({acountName:account.accountName})

   } catch(error){
        res.status(500).json({message:error.message})
   }

}