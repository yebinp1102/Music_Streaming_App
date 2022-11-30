import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username :  String,
  password: String, 
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