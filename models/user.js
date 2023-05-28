const mongoose = require("mongoose");

const user = mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp:{
      type:String,
      default:"0000"
    },
    isVerified:{
      type:Boolean,
      default:false
    }
    // password:{
    //   type:String,
    //   required:true
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", user);
