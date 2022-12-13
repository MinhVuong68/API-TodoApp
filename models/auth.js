const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        minlength: 10,
        maxlengthL: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
    },
    admin: {
        type: Boolean,
        default: true
    }
},{timestamps: true}) // cho biet user duoc tao hay update vao thoi diem nao

module.exports = mongoose.model("Auth",authSchema)