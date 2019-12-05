const express = require('express');
const router = express.Router();

//const group = require('../controllers/groups');
const reply = require('../controllers/replies');

const middleware = require('../middleware/login')

router.post('/createReply/:post_id', middleware.verifyToken, reply.CreateReply);
router.put('/deleteReply/:user_id/:reply_id', middleware.verifyToken, reply.DeleteReply);
// router.delete('/deleteGroup/:user_id',middleware.verifyToken, group.DeleteGroup);
router.get('/getAllReplies/:user_id/:post_id', middleware.verifyToken, reply.GetAllRepliesToPost);
// router.post('/joinRequest/:user_id',middleware.verifyToken, group.JoinRequest);
// router.post('/acceptJoinRequest/:user_id',middleware.verifyToken, group.AcceptJoinRequest);

module.exports = router;