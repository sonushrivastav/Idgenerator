const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userIdCardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference back to the User
  name: { type: String, required: true },
  photo: { type: String }, 
  age: { type: Number },
});

module.exports = mongoose.model('UserIdCard', userIdCardSchema);
