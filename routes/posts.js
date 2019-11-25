const express = require('express');
const router = express.Router();

const post = require('../controllers/posts');

const middleware = require('../middleware/login')
console.log("entered routs")

router.post('/createPost/:user_id/and/:group_id', middleware.verifyToken, post.CreatePost);
// router.delete('/deleteGroup/:user_id',middleware.verifyToken, group.DeleteGroup);
// router.get('/getAllGroups', group.GetALlGroups);
// router.post('/joinRequest/:user_id',middleware.verifyToken, group.JoinRequest);
// router.post('/acceptJoinRequest/:user_id',middleware.verifyToken, group.AcceptJoinRequest);

module.exports = router;