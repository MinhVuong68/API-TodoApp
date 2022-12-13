const Task = require('../models/task')
const User = require('../models/user')

const userController = {
    createUser: async(req,res) => {
        try {
            const newUser = new User(req.body)
            const saveUser = await newUser.save()
            res.status(200).json(saveUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getTasks: async(req,res) => {
        try {
            const tasks = await Task.find()
            res.status(200).json(tasks)
        } catch (error) {
            console.log(error);
        }
    } 
}
 
module.exports = userController