const mongoose = require("mongoose");

const tasks = mongoose.Schema(
  {
    headline: {
      //what's up
      type: String,
      required: true,
    },
    starttime: {
      //could be too nosy
      type: Date,
    },
    duration: {
      //how long did it take
      type: Number,
    },
    endTime: {
      //same as starttime
      type: Date,
    },
    area: {
      type: String,
      enum: ["work", "hobby", "family&friends", "self-care", "misc"],
      required: true,
    },
    description: {
      //would you like to add anything
      type: String,
    },
    createdBy:{
      type:mongoose.Types.ObjectId,
      ref:"user"
    },
    status:{
      type:String,
      enum:["pending","completed"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", tasks);
