const express = require('express')
const router = express.Router()
const { signup, loginUser, logoutUser } =require('../controllers/userController')
router.route('/signup').post(signup)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
module.exports=router