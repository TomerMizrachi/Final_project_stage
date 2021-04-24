import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {validateRegisterInput} from '../validation/register.js'
import {validateLoginInput} from '../validation/login.js'
import User from '../models/user.js'
import keys from '../config/keys.js'


const getUsers = async (req, res) => {
    try {
        const docs = await User.find({})
        return res.status(200).json(docs)
    } catch (err) {
        console.log(`query error: ${err}`)
    }
}

const getUserById = async (req, res) => {
    try {
        const docs = await User.find({ _id: req.params.id }, (err) => {
            if (err) throw err
        })
        if (docs.length == 0) throw {
            message: 'no content'
        }
        res.status(200).json(docs[0])
    } catch (err) {
        res.status(500).send(err)
    }
}

const register = (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    User.findOne({ Email: req.body.email }).then(user => {
        console.log("hhh", req.body.email)
        if (user) {
            return res.status(400).json({ email: "Email already exists" })
        } else {
            const newUser = new User({
                full_name: req.body.name,
                Email: req.body.email,
                password: req.body.password
            })
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    }).catch((error) => {
        console.error(error);})
}

const login = (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const password = req.body.password
    // Find user by email
    User.findOne({ Email: req.body.email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" })
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user._id,
                    name: user.full_name
                }
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                    }
                )
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" })
            }
        })
    }).catch((error) => {
        console.error(error);})
}


export { getUsers, getUserById, register, login }