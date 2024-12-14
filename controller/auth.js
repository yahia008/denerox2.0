const User = require('../model/user')
const {generatejwt} = require('../config/utils');
const EventEmitter = require('events')
const Account = require('../model/account')
const event = new EventEmitter()
const bcrypt = require('bcrypt')

exports.signUp =  async(req, res) => {
    const {firstName, lastName, phoneNumber, email, password} = req.body

    try{
        const userExists = await User.findOne({ email });
        if(userExists){
            throw new Error('user already exist')
        }

        const accountExist = await Account.findOne({phoneNumber})
        if(accountExist){
          throw new Error('account already exist')
      }
        //const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password,

          });
          
          await user.save()
          
            const accName =  `${firstName} ${lastName}`
          const account = new Account({
            user:user._id,
            email,
            accountNumber:phoneNumber,
            accountName:accName,
          })
      
          await account.save()

        
          if(user) {
            const token = generatejwt(user.toJSON());

            const responsePayload = {
              msg: 'user created successfully',
              token: token,
              
          };
            res.status(201).json(responsePayload)
            
          }else {
            res.status(400);
            throw new Error("Invalid user data");
          }
    }catch(error){
   res.status(400).json({msg: error.message || 'An error occurred during sign-up'})
    }
}



exports.signIn = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
      if (!phoneNumber || !password) {
          throw new Error("Please provide both phone number and password");
      }

      const authUser = await User.findOne({ phoneNumber });
      const userAccount = await Account.findOne({ accountNumber: phoneNumber });

      if (!authUser) {
          throw new Error("User not found");
      }
      if (!userAccount) {
          throw new Error("No associated account found");
      }

      // Compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, authUser.password);
      if (!isPasswordValid) {
          throw new Error("Invalid username or password");
      }

      // Generate token
      const user = { id: authUser._id };

      res.json({
          msg: "Login successful",
          id: authUser._id,
          name: authUser.firstName,
          email: authUser.email,
          balance: userAccount.balance,
          accountName: userAccount.accountName,
          accountNumber: userAccount.accountNumber,
          accountId: userAccount.user,
          token: generatejwt(user),
      });
  } catch (error) {
      res.status(400).json({ msg: error.message });
  }
};
