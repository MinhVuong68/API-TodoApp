const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String
    },
    finished: {
        type: Boolean
    }
})

let Task = mongoose.model("Task",taskSchema)

module.exports = Task