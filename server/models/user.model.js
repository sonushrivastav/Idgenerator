const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String},
    email:{type:String,},
    password:{type:String},
   idCard: { type: Schema.Types.ObjectId, ref: 'UserIdCard' },

})


module.exports = mongoose.model('User', userSchema);
