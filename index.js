const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')


dotenv.config()

//CONNECT TO MONGODB
mongoose.connect((process.env.MONGODB_URL),()=> {
    console.log("Conneted to Mongodb");
})

app.use(bodyParser.json({limit: '50mb'}))
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(morgan("common"))

app.use("/v1/api/task",taskRouter)
app.use("/v1/api/auth",authRouter)
app.use("/v1/api/user",userRouter)

app.listen(8000,()=>{
    console.log("Server is running...")
})

//AUTHENTICATION -> DANG NHAP


//AUTHORIZATION --> PHAN QUYEN