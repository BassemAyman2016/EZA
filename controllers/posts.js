const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
    // const passport = require('passport')
const Post = require('../models/Post');
const Group = require('../models/Group');
const GroupUser = require('../models/GroupUser');
const User = require('../models/User')
const tokenKey = require('../config').secretOrKey
require('dotenv').config();



CreatePost = async function(req, res) {
    try {
        const validation = req.body && req.body.Message != null
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params are missing' })
        } else {
            if (req.user_id !== req.params.user_id) {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }
            const user = await User.findOne({ '_id': req.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }
            const group = await Group.findOne({ '_id': req.params.group_id })
            if (!group) {
                return res.status(404).send({ status: 'failure', message: 'Group Not Found' })
            }
            const groupUser = await GroupUser.findOne({ 'group_id': req.params.group_id, 'user_id': req.params.user_id })
            if (!groupUser) {
                return res.status(404).send({ status: 'failure', message: 'you are not part of this group' })
            }
            if (user.Deleted === true) { // Deactivated send message to activate
                return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            } else {
                const { Message } = req.body
                const alreadyAsked = await Post.findOne({ 'Message': Message, 'user_id': req.params.user_id })
                if (alreadyAsked) {
                    return res.status(400).send({ status: 'failure', message: 'you already asked this question' });
                } else {
                    const postObject = {
                        Message: Message,
                        user_id: req.params.user_id,
                        group_id: req.params.group_id
                    }
                    const createPost = await Post.create(postObject)
                    const postCreated = await Post.findOne({ '_id': createPost._id });
                    if (postCreated) {
                        res.status(200).send({ status: 'success', msg: 'Post Created successfully', data: postCreated });
                    } else {
                        return res.status(404).send({ status: 'failure', message: 'error occured while creating the post' })
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Post Submission Failed' });
    }
};

DeletePost = async function(req, res) {
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
        if (post.user_id === req.params.user_id) {
            if (user.Deleted === true) {
                return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            } else {
                await Post.findOneAndUpdate({ user_id: req.params.user_id, _id: req.params.post_id }, { Deleted: true })
                const deletedPost = await Post.find({ user_id: req.params.user_id, _id: req.params.post_id })
                res.status(200).send({ status: 'success', msg: 'Post Deleted successfully', data: deletedPost });
            }
        } else {
            return res.status(404).send({ status: 'failure', message: 'you cannot delete this post' })
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Post Deletion Failed' });
    }
}

GetAllGroupPosts = async function(req, res) {
    try {
        if (req.user_id !== req.params.user_id) {
            return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
        }
        const user = await User.findOne({ '_id': req.params.user_id })
        if (!user) {
            return res.status(404).send({ status: 'failure', message: 'User Not Found' })
        }
        const group = await Group.findOne({ '_id': req.params.group_id })
        if (!group) {
            return res.status(404).send({ status: 'failure', message: 'Group Not Found' })
        }
        const groupUser = await GroupUser.findOne({ 'user_id': req.params.user_id, 'group_id': req.params.group_id })
        if (!groupUser) {
            if (group.Created_By !== req.params.user_id)
                return res.status(404).send({ status: 'failure', message: 'You Are Not Part Of This Group' })
        }
        if (user.Deleted === true) {
            return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
        } else {
            const allPosts = await Post.find({ group_id: req.params.group_id, Deleted: false })
            res.status(200).send({ status: 'success', msg: 'Posts Fetched successfully', data: allPosts });
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Posts Fetching Failed' });
    }
}


module.exports = {
    CreatePost,
    DeletePost,
    GetAllGroupPosts
}