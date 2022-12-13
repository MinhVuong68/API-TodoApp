const Auth = require('../models/auth')
const bcrypt = require('bcrypt') // hash mat khau
const jwt = require ('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/user')

dotenv.config()
const authController = {
    //REGISTER
    register: async(req,res) => {
        try {
            const salt = await bcrypt.genSalt(10) 
            const hashed = await bcrypt.hash(req.body.password,salt)

            // create new auth
            const newAuth = await new Auth({
                email: req.body.email,
                password: hashed
            })
            // save to database
            const auth = await newAuth.save()

            //create new user
            const newUser = await new User({
                email: req.body.email,
            })
            //save to database
            const user = await newUser.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //GENERATE ACCESS TOKEN
    generateAccessToken: (auth) => {
        return jwt.sign(
            {
                id: auth.id,
                admin: auth.admin
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: "365d"
            }
        )
    },

    //GENERATE ACCESS TOKEN
    generateRefreshToken: (auth) => {
        return jwt.sign(
            {
                id: auth.id,
                admin: auth.admin
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: "365d"
            }
        )
    },

    //LOGIN
    login: async(req,res) => {
        try {
            const auth = await Auth.findOne({email: req.body.email})
            if(!auth) {
                return res.status(404).json("Wrong email")
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                auth.password
            )
            if(!validPassword){
                return res.status(404).json("Wrong password")
            }
            if(auth && validPassword) {
                const accessToken = authController.generateAccessToken(auth)
                const refreshToken = authController.generateRefreshToken(auth)
                const {password,...others} = auth._doc
                const userInfor = await User.findOne({email: req.body.email})
                res.status(200).json(userInfor)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    logout: async(req,res) => {
        //...//
    }
}

 

module.exports = authController