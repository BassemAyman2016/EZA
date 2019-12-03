const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const group = require('../controllers/groups');
const middleware = require('../middleware/login')

// a simple test url to check that all of our files are communicating correctly.
router.post('/creategroup/:user_id',middleware.verifyToken, group.CreateGroup);
router.delete('/deleteGroup/:user_id/:group_id',middleware.verifyToken, group.DeleteGroup);
router.get('/getAllGroups', group.GetALlGroups);
router.post('/joinRequest/:user_id',middleware.verifyToken, group.JoinRequest);
router.get('/requests/:group_id',middleware.verifyToken, group.getRequests);
router.post('/acceptJoinRequest/:user_id',middleware.verifyToken, group.AcceptJoinRequest);
router.get('/getAllGroupByCreator/:user_id',middleware.verifyToken, group.GetAllGroupByCreator);
router.get('/getAllGroupByUser/:user_id',middleware.verifyToken, group.GetAllGroupByUser);
router.get('/getAllUsersInGroup/:user_id/:group_id',middleware.verifyToken, group.GetAllUsersInGroup);
router.delete('/doctorKickUser/:user_id',middleware.verifyToken, group.DoctorKickUser);
router.post('/doctorInviteUser/:user_id/:group_id',middleware.verifyToken,group.DoctorInviteUser);

module.exports = router;