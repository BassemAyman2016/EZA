const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
    // const passport = require('passport')
const Group = require('../models/Group');
const GroupUser = require('../models/GroupUser');
const User = require('../models/User')
const tokenKey = require('../config').secretOrKey
require('dotenv').config();

CreateGroup = async function(req, res) {
    try {
        const validation = req.body && req.body.Name != null
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params Missing' });

        } else {
            if (req.user_id !== req.params.user_id) {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }
            const user = await User.findOne({ '_id': req.params.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }
            if (user.User_Category !== 'Doctor') {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }
            if (user.Deleted === true) { // Deactivated send message to activate
                return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            }

            const { Name } = req.body;
            req.body.Created_By = user._id;
            console.log(req.body);
            const group = await Group.findOne({ 'Name': Name });
            if (group) {
                return res.status(400).send({ status: 'failure', message: 'Name Already Exists' });
            }
            const newGroup = await Group.create(req.body);
            const groupCreated = await Group.findOne({ '_id': newGroup._id });
            res.status(200).send({ status: 'success', msg: 'Group created successfully', data: groupCreated });
        }
    } catch (e) {
        console.log(e)
        res.status(422).send({ status: 'failure', message: 'Creation of Group Failed' });
    }
};
DeleteGroup = async function(req, res) {
    try {
        const validation = req.body && req.body.Name != null
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params Missing' });

        } else {
            if (req.user_id !== req.params.user_id) {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }
            const user = await User.findOne({ '_id': req.params.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }
            if (user.User_Category !== 'Doctor') {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }
            if (user.Deleted === true) { // Deactivated send message to activate
                return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            }

            const { Name } = req.body;
            const group = await Group.findOne({ 'Name': Name });
            if (group.Created_By === req.user_id) {
                await Group.deleteOne({ Name });
                res.status(200).send({ status: 'success', msg: 'Group Deleted successfully' });
            } else {
                return res.status(404).send({ status: 'failure', message: 'This group is not created by you' })
            }


        }
    } catch (e) {
        console.log(e)
        res.status(422).send({ status: 'failure', message: 'Deletion of Group Failed' });
    }
};
GetALlGroups = async function(req, res) {
    try {

        const groups = await Group.find();

        return res.status(200).json({ status: 'sucess', data: groups })



    } catch (e) {
        console.log(e)
        res.status(422).send({ status: 'failure', message: 'group showing data Failed' });
    }
};
JoinRequest = async function(req, res) {
    try {
        const validation = req.body && req.body.Name != null
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params Missing' });

        } else {
            if (req.user_id !== req.params.user_id) {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }
            const user = await User.findOne({ '_id': req.params.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }

            if (user.Deleted === true) { // Deactivated send message to activate
                return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            }

            const { Name } = req.body;
            const group = await Group.findOne({ 'Name': Name });
            const joinedGroup = await GroupUser.findOne({ group_id: group._id, user_id: req.user_id });
            if (joinedGroup) {
                if (joinedGroup.Pending)
                    return res.status(404).send({ status: 'failure', message: 'You  Already  Requested to Enter This Group' });
                else
                    return res.status(404).send({ status: 'failure', message: 'You Are Already In This Group' });
            } else {
                const joining = await GroupUser.create({ group_id: group._id, user_id: req.user_id, Pending: true });
                const joiningCreated = await GroupUser.findOne({ '_id': joining._id });
                res.status(200).send({ status: 'success', msg: 'Join Request created successfully', data: joiningCreated });
            }





        }
    } catch (e) {
        console.log(e)
        res.status(422).send({ status: 'failure', message: 'Deletion of Group Failed' });
    }
};
AcceptJoinRequest = async function(req, res) {
    try {
        const validation = req.body && req.body.group_id != null && req.body.requesting_id != null;
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params Missing' });

        } else {
            if (req.user_id !== req.params.user_id) {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }
            const user = await User.findOne({ '_id': req.params.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }
            if (user.User_Category !== 'Doctor') {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }

            if (user.Deleted === true) { // Deactivated send message to activate
                return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            }

            const { group_id, requesting_id } = req.body;

            const AcceptRequest = await GroupUser.findOne({ group_id: group_id, user_id: requesting_id });
            await GroupUser.findByIdAndUpdate(AcceptRequest._id, { Pending: false });
            const updated = await GroupUser.findOne({ '_id': AcceptRequest._id });
            return res.status(200).send({ status: 'success', message: 'success', data: updated });
        }
    } catch (e) {
        console.log(e)
        res.status(422).send({ status: 'failure', message: 'Deletion of Group Failed' });
    }
};
module.exports = {
    CreateGroup,
    DeleteGroup,
    GetALlGroups,
    JoinRequest,
    AcceptJoinRequest
}