const express = require('express');
const router = express.Router();

const post = require('../controllers/posts');

const middleware = require('../middleware/login')

router.post('/createPost/:user_id/:group_id', middleware.verifyToken, post.CreatePost); //I should be able to add post
router.post('/deletePost/:user_id/:post_id', middleware.verifyToken, post.DeletePost);
router.get('/getGroupPosts/:user_id/:group_id', middleware.verifyToken, post.GetAllGroupPosts);
// router.post('/acceptJoinRequest/:user_id',middleware.verifyToken, group.AcceptJoinRequest);

module.exports = router;