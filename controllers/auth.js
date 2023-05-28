const users = require("../models/user");

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { Auth } = require("two-step-auth");
const user = require("../models/user");
const session = require('express-session');


//login with email otp
//sign up with email otp
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await Auth(email, "Analisi");
    const user = await users.findOne({ email: email });
    if (!user) {
      const newuser = await users.create({
        email: email,
        otp: result.OTP,
      });
    }
    await users.findOneAndUpdate(
      { email: email },
      {
        $set: {
          otp: result.OTP,
        },
      }
    );

    return res.send({
      status: 0,
      msg: "sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      msg: "Something went wrong",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.session.destroy();
    return res.status(200).send({
      status: 0,
      msg: "Logged out",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, OTP } = req.body;
    const user = await users.findOne({ email: email });
    if (user.otp == OTP) {
      await users.findOneAndUpdate(
        { email: email },
        {
          $set: {
            isVerified: true,
          },
        }
      );
    //   console.log(req.session)
      req.session.userid = user._id;
      console.log(req.session)
      return res.send({
        status: 0,
        msg: "Login succesfull",
      });
    }
    return res.send({
      status: 1,
      msg: "Incorrect otp",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { verifyOTP, sendOTP, logout };
