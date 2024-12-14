const User = require('../model/user')



exports.Profile = async (req, res) => {
    const userId = req.user.id
    try{
        const user = await User.findById(userId)
        if(!user) throw new Error('user not found')
            
            res.status(200).json({ success: true, user });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            msg: error.message || 'An unexpected error occurred',
        });
    }
    


}