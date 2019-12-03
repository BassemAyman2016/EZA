const Resource = require('../models/Resources');
const Group = require('../models/Group');
const GroupUser = require('../models/GroupUser');
const User = require('../models/User')
require('dotenv').config();



addResource = async function (req, res) {
    try {
        const validation = req.body && req.body.data != null
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params are missing' })
        } else {
            const user = await User.findOne({ '_id': req.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }
            const group = await Group.findOne({ '_id': req.params.group_id })
            if (!group) {
                return res.status(404).send({ status: 'failure', message: 'Group Not Found' })
            }
            const groupUser = await GroupUser.findOne({ 'group_id': req.params.group_id, 'user_id': req.user_id })
            if (!groupUser) {
                return res.status(403).send({ status: 'failure', message: 'Access Forbidden' })
            }
            if (user.Deleted === true) { // Deactivated send message to activate
                return res.status(401).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            }
            const data = req.body.data

            const resourceObject = {
                data: data,
                user_id: req.user_id,
                group_id: req.params.group_id
            }
            const createResource = await Resource.create(resourceObject)
            const resourceCreated = await Resource.findOne({ '_id': createResource._id });
            if (resourceCreated) {
                res.status(200).send({ status: 'success', msg: 'Resource Added successfully', data: resourceCreated });
            } else {
                return res.status(422).send({ status: 'failure', message: 'error occured while adding the resource' })
            }


        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Resource Submission Failed' });
    }
};

removeResource = async function (req, res) {
    try {
        const validation = req.body && req.body.data != null
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params are missing' })
        } else {
            const user = await User.findOne({ '_id': req.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }
            const group = await Group.findOne({ '_id': req.params.group_id })
            if (!group) {
                return res.status(404).send({ status: 'failure', message: 'Group Not Found' })
            }
            const groupUser = await GroupUser.findOne({ 'group_id': req.params.group_id, 'user_id': req.user_id })
            if (!groupUser) {
                return res.status(403).send({ status: 'failure', message: 'Access Forbidden Cannot delete this post as you are not the creator' })
            }
            if (user.Deleted === true) { // Deactivated send message to activate
                return res.status(401).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            }
            const id = req.params.resource_id
            const group_id = req.params.group_id
            const deleteResource = await Resource.findOneAndDelete({ '_id': id, 'group_id': group_id });
            res.status(200).send({ status: 'success', msg: 'Resource Deleted successfully' });

            return res.status(422).send({ status: 'failure', message: 'error occured while deleting the resource' })



        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Resource Deletion Failed' });
    }
};


module.exports = {
    addResource,
    removeResource
}