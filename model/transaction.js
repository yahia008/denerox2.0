const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    amount: {
        type: Number,
        required: true,
      },
      transactionType: {
        type: String,
        enum: ['deposit', 'withdrawal', 'transfer'],
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
      },
    otp:{type:String},
      description: {
        type: String,
        default: '',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
     

})
transactionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

  module.exports = mongoose.model('Transaction', transactionSchema);