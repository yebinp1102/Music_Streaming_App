import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username :  {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type : Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const User = mongoose.model('User', UserSchema)

export default User;