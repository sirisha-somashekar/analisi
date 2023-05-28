const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const mongoose = require('mongoose');
var session = require('express-session')
var cookies = require("cookie-parser");
app.use(cookies());

app.use(cors({ origin: process.env.origin }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api',require('./routes/api'))

// console.log(app)



app.listen(process.env.PORT,()=>{
    console.log("App is runnning")
})

app.use(
    session({
      // key: "user_sid",
      secret: "hopw",
      resave: true,
      saveUninitialized: false,
      path:'/',
      cookie:{
        maxAge: 24*60*60*1000,
      },
      
      secure:false
    })
  );

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected ");
  })
  .catch((err) => {
    console.log(err);
    console.log("connection failed");
  });

  app.use("/api", require("./routes/api"));


