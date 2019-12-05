const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
    // const passport = require('passport')
const Post = require('../models/Post');
const Group = require('../models/Group');
const GroupUser = require('../models/GroupUser');
const User = require('../models/User')
const Reply = require('../models/Reply')
const tokenKey = require('../config').secretOrKey
const fs = require('fs')
const path = require('path')
const EmailAdapter = require('../helpers/mailAdapter')

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
            const post = await Post.findById(req.params.post_id)
            if (!post) {
                return res.status(404).send({ status: 'failure', message: 'Post Not Found' })
            }
            const groupId = post.group_id
            const groupUser = GroupUser.findOne({ group_id: groupId.toString(), user_id: user_id.toString() })
                // console.log(groupUser ? 'true' : 'false')
                // if (typeof groupUser.group_id == 'undefined') {
                //     const group = await Group.findOne({ '_id': groupId })
                //     if (group.Created_By !== req.user_id) {
                //         return res.status(400).send({ status: 'failure', message: 'you are not part of this group' })
                //     }


            // }
            if (user.Deleted === true) { // Deactivated send message to activate
                return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            } else {
                const { Message } = req.body
                const alreadyReplied = await Reply.findOne({ 'Message': Message, 'user_id': user_id })
                if (alreadyReplied) {
                    return res.status(400).send({ status: 'failure', message: 'you already posted this reply' });
                } else {
                    const getUserEmail = await User.findOne({ '_id': post.user_id })
                    console.log(getUserEmail.Email)
                    if (!getUserEmail) {
                        return res.status(404).send({ status: 'failure', message: 'The User Posted this post may have removed it' });
                    }
                    try {
                        // const html = fs.readFileSync(path.resolve(__dirname, 'digestTemplate.html'), 'utf8').toString()
                        //     .replace(/\$\{token\}/g, `http://localhost:8080/posts/${post._id}`)
                        //     .replace(/\$\{token2\}/g, `User with this Information: Email: ${user.Email}, Name:${user.First_Name + ' ' + user.Last_Name} Replied On Your Post`)
                        // const sendMail = await EmailAdapter.send('eza+@eza.com', getUserEmail.Email, 'Activty', 'Digest', html)
                        const replyObject = {
                            Message: Message,
                            user_id: user_id,
                            group_id: groupId,
                            post_id: req.params.post_id
                        }
                        const createReply = await Reply.create(replyObject)
                        const replyCreated = await Reply.findOne({ '_id': createReply._id });
                        if (replyCreated) {
                            res.status(200).send({ status: 'success', msg: 'Reply Created successfully', data: replyCreated });
                        } else {
                            return res.status(404).send({ status: 'failure', message: 'error occured while creating the reply' })
                        }
                    } catch (e) {
                        console.log(e)
                        res.status(422).send({ status: 'failure', message: 'Reply Submission Failed' });
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Reply Submission Failed' });
    }
}

DeleteReply = async function(req, res) {
    try {
        if (req.user_id !== req.params.user_id) {
            return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
        }
        const user = await User.findOne({ '_id': req.params.user_id })
        if (!user) {
            return res.status(404).send({ status: 'failure', message: 'User Not Found' })
        }
        const reply = await Reply.findOne({ '_id': req.params.reply_id })
        if (!reply) {
            return res.status(404).send({ status: 'failure', message: 'Reply Not Found' })
        }
        if (reply.user_id.toString() === req.params.user_id) {
            if (user.Deleted === true) {
                return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            } else {
                await Reply.findOneAndUpdate({ user_id: req.params.user_id, _id: req.params.reply_id }, { Deleted: true })
                const deletedReply = await Reply.find({ user_id: req.params.user_id, _id: req.params.reply_id })
                res.status(200).send({ status: 'success', msg: 'Post Deleted successfully', data: deletedReply });
            }
        } else {
            const group = Group.findOne({ _id: reply.group_id.toString(), Created_By: req.params.user_id })
            if (group) {
                await Reply.findOneAndUpdate({ _id: req.params.reply_id }, { Deleted: true })
                const deletedReply = await Reply.find({ user_id: req.params.user_id, _id: req.params.reply_id })
                res.status(200).send({ status: 'success', msg: 'Post Deleted successfully', data: deletedReply });
            } else
                return res.status(404).send({ status: 'failure', message: 'you cannot delete this reply' })
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Reply Deletion Failed' });
    }
}

GetAllRepliesToPost = async function(req, res) {
    try {
        if (req.user_id !== req.params.user_id) {
            return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
        }
        const user = await User.findOne({ '_id': req.params.user_id })
        if (!user) {
            return res.status(404).send({ status: 'failure', message: 'User Not Found' })
        }
        const post = await Post.findOne({ '_id': req.params.post_id })
        if (!post) {
            return res.status(404).send({ status: 'failure', message: 'Post Not Found' })
        }
        const groupId = post.group_id
        const groupUser = await GroupUser.findOne({ 'user_id': req.params.user_id, 'group_id': groupId })
        if (!groupUser) {
            const group = await Group.findOne({ '_id': groupId })
            if (group.Created_By !== req.params.user_id)
                return res.status(404).send({ status: 'failure', message: 'You Are Not Part Of This Group' })
        }
        if (user.Deleted === true) {
            return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
        } else {
            const allReplies = await Reply.find({ post_id: req.params.post_id, Deleted: false }).populate({ path: 'user_id' }).populate({ path: 'group_id' }).populate({ path: 'post_id' })
            res.status(200).send({ status: 'success', msg: 'Replies Fetched successfully', data: allReplies });
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Replies Fetching Failed' });
    }
}


module.exports = {
    CreateReply,
    DeleteReply,
    GetAllRepliesToPost
}