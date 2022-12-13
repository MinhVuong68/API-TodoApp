const Task = require("../models/task")
const User = require("../models/user")

const taskController = {
    addTask: async (req,res) => {
        try {
            const newTask = new Task(req.body)
            const saveTask = await newTask.save()
            if(req.body.user) {
                const user = User.find({_id: req.body.user})
                await user.updateOne({$push :{tasks: saveTask._id}})
                
            }
            res.status(200).json('Add task sucessfully')
         } catch (error) {
            res.status(500).json(error)
        }
    },
    getAStask: async (req,res)=>{
        try {
            const task = await Task.findById({_id:req.params.id})
            res.status(200).json(task)
        } catch (error) {
            console.log(error);
        }
    },
    getAllStask: async (req,res) => {
        try {
            const allTask = await Task.find()
            res.status(200).json(allTask)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteTask: async (req,res) => {
        try {
            await User.updateMany(
                {tasks: req.params.id},
                {$pull: {tasks: req.params.id}
            })
            await Task.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted sucessfully")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getTasksByUserId: async(req,res) => {
        try {
            const tasks = await Task.find({user: req.params.id})
            res.status(200).json(tasks)
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = taskController