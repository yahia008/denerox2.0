const Account = require('../model/account')
const {generateFourDigitCode} = require('../config/utils')
const bcrypt = require('bcrypt')
const {sendmail}  = require('../config/utils')

exports.transactionPin = async(req, res) => 
{
    const accountId = req.user.id
    const {pin}  = req.body
    try{

        const account = await Account.findOne({user:accountId})
        if(!account) throw new Error('invalid user')
        
         const hashedPIN = bcrypt.hashSync(String(pin), 10)

        account.pin = hashedPIN
        account.save()
        res.status(200).json({message:'transaction pin is set'})
    }catch(error){
    res.status(400).json({message:error.message})
    }


}

exports.resetPin = async(req, res) => {
    let account
   try{
    const accountId = req.user.id
     account = await Account.findOne({user:accountId})
     if(!account) throw new Error('user not found')
    
    const code = generateFourDigitCode()
    const hashedOTP = bcrypt.hashSync(String(code), 10)

    account.otp = hashedOTP
    account.save()

    await sendmail({
        email: account.email,
        subject: 'Your reset pin',
        message: `Your reset pin for transfer is: ${code}`, 
    });
    res.status(200).json({msg:'resetpin sent'})
   }catch(error)
   {
    account.otp=undefined
    res.status(500).json({msg:error.message})
   }
}

exports.verifyPin = async (req, res) => {
    const accountId = req.user.id
    const {otp, pin} = req.body
    let account

    try{
        account = await Account.findOne({user:accountId})
        if(!account) throw new Error('user not found')
        const isOtpValid = bcrypt.compareSync(otp, account.otp);
        if (!isOtpValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        const hashedPIN = bcrypt.hashSync(String(pin), 10)
        account.pin = hashedPIN
        account.otp=undefined
        account.save()

        res.status(200).json({msg:"pin  reset successfully"})

    }catch(error){
     account.otp = undefined
     account.pin=undefined
     res.status(500).json({msg:error.message})
    }
}