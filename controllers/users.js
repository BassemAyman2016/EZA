const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const passport = require('passport')
const User = require('../models/User');
const tokenKey = require('../config').secretOrKey
require('dotenv').config();


Login = async function (req, res) {
    try {
        const validation = req.body && req.body.Email != null && req.body.Password != null
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params Missing' });

        }
        const { Email, Password } = req.body;
        const user = await User.findOne({ 'Email': Email });
        if (!user) {
            return res.status(404).send({ status: 'failure', message: 'Email Not Found' });
        }
        const match = bcrypt.compareSync(Password, user.Password);
        if (match) {
            if (user.Deleted === true) {
                return res.status(403).send({ status: 'failure', message: 'Account is currently deactivated request to activate your account through email' })
            }
            else {
                const payload = {
                    id: user._id,
                    User_Category: user.User_Category
                }
                req.user_id = user._id
                req.role = user.User_Category
                const token = jwt.sign(payload, tokenKey, { expiresIn: '3h' })
                return res.status(200).send({ status: 'success', token: `bearer ${token}`, role: user.User_Category, id: user._id })
            }
        }
        else return res.status(400).send({ error: 'Wrong password' });
    } catch (e) {
        console.log(e)
        res.status(422).send({ status: 'failure', message: 'Sign In Failed' });
    }
};

UserRegistration = async function (req, res) {
    try {
        const validation = req.body && req.body.Password != null && req.body.Email != null && req.body.User_Category != null
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params are missing' })
        }
        else {
            if (req.body.User_Category === 'Student') {
                if (!req.body.student_id) {
                    return res.status(400).send({ status: 'failure', message: 'Student ID Missing' })
                }
                const user = await User.findOne({ 'Email': req.body.Email });
                if (user) {
                    return res.status(400).send({ status: 'failure', message: 'Email Already Exists' })
                }
                const encrypted = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.Password, encrypted);
                req.body.Password = hashedPassword
                req.body.Deleted = false
                const newUser = await User.create(req.body);
                const userCreated = await User.findOne({ '_id': newUser._id })
                res.status(200).send({ status: 'success', msg: 'User created successfully', data: userCreated });
            }
            else {
                const user = await User.findOne({ 'Email': req.body.Email });
                if (user) {
                    return res.status(400).send({ status: 'failure', message: 'Email Already Exists' })
                }
                const encrypted = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.Password, encrypted);
                req.body.Password = hashedPassword
                const newUser = await User.create(req.body);
                const userCreated = await User.findOne({ '_id': newUser._id })
                res.status(200).send({ status: 'success', msg: 'User created successfully', data: userCreated });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'User Creation Failed' });
    }
};
UpdateUser = async function (req, res) {
    try {
        const validation = req.body
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params are missing' })
        }
        else {
            if (req.user_id !== req.params.user_id) {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }
            const user = await User.findOne({ '_id': req.params.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }
            if (user.Deleted === true) { // Deactivated send message to activate
                return res.status(404).send({ status: 'failure', message: 'Account is deactivated to activate your account please request access' })
            } else {
                const encrypted = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.Password, encrypted);
                req.body.Password = hashedPassword
                if (user.User_Category === 'Student') {
                    dataToBeUpdated = {
                        Email: req.body.Email,
                        Password: req.body.Password,
                        phone_number: req.body.phone_number,
                        First_Name: req.body.First_Name,
                        Last_Name: req.body.Last_Name,
                        Birth_Date: req.body.Birth_Date,
                        student_id: req.body.student_id,
                    }
                }
                else {
                    dataToBeUpdated = {
                        Email: req.body.Email,
                        Password: req.body.Password,
                        phone_number: req.body.phone_number,
                        First_Name: req.body.First_Name,
                        Last_Name: req.body.Last_Name,
                        Birth_Date: req.body.Birth_Date,
                    }
                }
                const newUser = await User.updateOne({ '_id': req.params.user_id }, dataToBeUpdated);
                const userCreated = await User.findOne({ '_id': req.params.user_id })
                userCreated.Password = undefined
                userCreated.Deleted = undefined
                res.status(200).send({ status: 'success', msg: 'User Updated successfully', data: userCreated });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Update Profile Failed' });
    }
};

deleteProfile = async function (req, res) {
    try {
        const validation = req.body
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params are missing' })
        }
        else {
            if (req.user_id !== req.params.user_id) {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }
            const user = await User.findOne({ '_id': req.params.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }
            if (user.Deleted === true) {
                return res.status(401).send({ status: 'failure', message: 'Account Already Deactivated' })

            } else {
                const deleteUser = await User.updateOne({ '_id': req.params.user_id }, { Deleted: true });
                return res.status(200).send({ status: 'success', msg: 'Account Deactivated successfully' });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Update Profile Failed' });
    }
};
activateAccount = async function (req, res) {
    try {
        const validation = req.body
        if (!validation) {
            return res.status(400).send({ status: 'failure', message: 'Params are missing' })
        }
        else {
            if (req.user_id !== req.params.user_id) {
                return res.status(404).send({ status: 'failure', message: 'Access Forbidden' })
            }
            const user = await User.findOne({ '_id': req.params.user_id })
            if (!user) {
                return res.status(404).send({ status: 'failure', message: 'User Not Found' })
            }
            if (user.Deleted === false) {
                return res.status(401).send({ status: 'failure', message: 'Account Already Activated' })

            } else {
                const deleteUser = await User.updateOne({ '_id': req.params.user_id }, { Deleted: false });
                return res.status(200).send({ status: 'success', msg: 'Account Activated Successfully' });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(422).send({ status: 'failure', message: 'Update Profile Failed' });
    }
};
module.exports = {
    UserRegistration,
    Login,
    UpdateUser,
    deleteProfile,
    activateAccount
}