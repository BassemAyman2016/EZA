const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
    // const passport = require('passport')
const Post = require('../models/Post');
const Group = require('../models/Group');
const GroupUser = require('../models/GroupUser');
const User = require('../models/User')
const Reply = require('../models/Reply')
const tokenKey = require('../config').secretOrKey
require('dotenv').config();



CreateReply = async function(req, res) {
    try {
        const validation = req.body && req.body.Message != null
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params are missing' })
        } else {

            const user = await User.findOne({ '_id': req.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }
            const user_id = user._id
            const post = Post.findById(req.params.post_id)
            if (!post) {
                return res.status(404).send({ status: 'failure', message: 'Post Not Found' })
            }
            const groupId = post.group_id
            const groupUser = GroupUser.findOne({ group_id: groupId, user_id: user_id })
            if (!groupUser) {
                return res.status(400).send({ status: 'failure', message: 'you are not part of this group' })
            }
            if (user.Deleted === true) { // Deactivated send message to activate
                return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            } else {
                const { Message } = req.body
                const alreadyReplied = await Reply.findOne({ 'Message': Message, 'user_id': user_id })
                if (alreadyReplied) {
                    return res.status(400).send({ status: 'failure', message: 'you already asked this question' });
                } else {
                    const replyObject = {
                        Message: Message,
                        user_id: user_id,
                        group_id: groupId,
                        post_id: req.params.post_id
                    }
                    const createReply = await Reply.create(replyObject)
                    const replyCreated = await Post.findOne({ '_id': createReply._id });
                    if (replyCreated) {
                        res.status(200).send({ status: 'success', msg: 'Reply Created successfully', data: replyCreated });
                    } else {
                        return res.status(404).send({ status: 'failure', message: 'error occured while creating the reply' })
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Reply Submission Failed' });
    }
};




module.exports = {
    CreateReply
}