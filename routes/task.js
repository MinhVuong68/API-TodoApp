const { Router } = require('express')
const middlewareController = require('../controller/middlewareController')
const taskController = require('../controller/taskController')

const router = require('express').Router()

//ADD TASK
router.post('/',taskController.addTask)

//GET ALL TASK
router.get('/',middlewareController.verifyToken,taskController.getAllStask)

//GET A TASK
//router.get("/:id",taskController.getAStask)

//DELETE A TASK
router.delete('/:id',taskController.deleteTask)

//GET TASKS BY USER ID
router.get("/:id",taskController.getTasksByUserId)

module.exports = router