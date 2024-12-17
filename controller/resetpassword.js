const User = require('../model/user')
const {sendmail} = require('../config/utils')
const crypto = require('crypto');


exports.forgotPassword = async(req, res)=> {
    const {email} = req.body
    const user = await User.findOne({email})
    try{
       
        if(!user) {
            res.status(404).json({message:'email does not exist'})
        }

         const token = user.resetToken();
         await user.save();

         const resetUrl = `${req.protocol}://${req.get('host')}/api/${token}/resetpassword`

         const message = `
        Hi ${user.firstName},
        
        You requested a password reset. Click the link below to reset your password:
        
        ${resetUrl}
        
        If you did not request this, please ignore this email.
    `;

    await sendmail({
        email: user.email,
        subject: 'Password Reset Request',
        message: message,
    });

    res.status(200).json({
        message:'Password reset email sent'
    })


    }catch(error){
       if(user){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(500).json({
            msg:error.message
        })
       }
       
    }
   
}

exports.resetPassword = async (req, res) => {
    try {
        const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        user.password = req.body.password; // Assuming you're sending the new password in the request body
        user.resetPasswordToken = undefined; // Clear the reset token
        user.resetPasswordExpires = undefined; // Clear the token expiry

        
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};