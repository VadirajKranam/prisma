const express = require("express");
const router = express.Router();
const { isLoggedIn }=require('../middleware/loggedIn');
const { createPost, updatePost, deletePost, getPost } = require("../controllers/postControllers");
router.route('/post/create').post(isLoggedIn,createPost)
router.route('/post/update/:id').put(isLoggedIn, updatePost)
router.route('/post/delete/:id').delete(isLoggedIn, deletePost)
router.route('/post/get').get(getPost)
module.exports=router