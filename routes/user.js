const userController = require('../controller/userController')
const router = require('express').Router()

router.post("/",userController.createUser)
router.get("/",userController.getTasks)

module.exports = router