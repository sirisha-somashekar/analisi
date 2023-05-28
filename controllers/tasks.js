const users = require("../models/user");
const tasks = require("../models/tasks");
const mongoose = require('mongoose');
// const tasks = require("../models/tasks");

//add to-do task
//

const addTask = async (req, res) => {
  try {
    const { headline, area, duration, description, status } = req.body;
    const isUser = await users.findById(req.session.userid);
    console.log(req.session)
    console.log(isUser)
    if (isUser) {
      if (!["pending", "completed"].includes(status)) {
        return res.send({
          status: 1,
          msg: "Invalid status",
        });
      }
      const task = await tasks.create({
        headline: headline,
        area: area,
        duration: duration,
        description: description,
        status: status,
        createdBy:req.session.userid
      });
      if (task) {
        return res.send({
          status: 0,
          msg: "Task created succesfully",
        });
      }
      return res.send({
        status: 1,
        msg: "Could not create task-Please try again later",
      });
    }
    return res.send({
      status: 1,
      msg: "User not found",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      msg: "Something went wrong.",
    });
  }
};

const viewTasks = async(req,res) => {
    try{
        // const{
        //     status
        // } = req.query;
        const user = await users.findById(req.session.userid);
        if(!user){
            return res.send({
                status:1,
                msg:"User not found"
            })
        }
        const task = await tasks.find({createdBy:req.session.userid})
        
        return res.send({
            status:0,
            tasks:task
        })

    }
    catch(error){
        console.log(error);
        return res.status(400).send({
            msg:"Something went wrong."
        })
    }
}

const graphit = async(req,res) => {
    try{
        const task = await tasks.find({CreatedBy:req.session.userid})
        console.log("userid",req.session.userid)
        // const user = await users.findById(userid);
        console.log(mongoose.Types.ObjectId(req.session.userid))
        const data = await tasks.aggregate([{
          $match:{
            "createdBy":{$eq:mongoose.Types.ObjectId(req.session.userid)}
          }},
          {$group:{
            _id: "$area",
            fieldN:{"$sum":"$duration"}
          }


          }])
        console.log(data)
        return res.send({
            status:0,
            data:data
        })

    }
    catch(error){
        console.log(error);
        return res.status(400).send({
            msg:"Something went wrong"
        })
    }
}

module.exports = {addTask,viewTasks, graphit}
