const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


const pinSchema = mongoose.Schema({
    pin:{yype:Number, required:true, maxlength: 4,}
})


UserSchema.pre('save', async function(next) {
    if (!this.isModified('pin')) return next();
    this.pin = await bcrypt.hash(this.pin, 12);
    next();
});


module.exports = mongoose.model('Pin', pinSchema);