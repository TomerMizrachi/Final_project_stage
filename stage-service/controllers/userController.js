import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { validateRegisterInput } from '../validation/register.js'
import { validateLoginInput } from '../validation/login.js'
import { validatePasswordInput } from '../validation/password.js'
import User from '../models/user.js'
import Actor from '../models/actor.js'
import keys from '../config/keys.js'
import { USER_TYPE } from '../config/types.js'
import Audition from '../models/audition.js'
import ActorAudition from '../models/actoraudition.js'



const getUsers = async (req, res) => {
    try {
        const docs = await User.find({})
        return res.status(200).json(docs)
    } catch (err) {
        return res.status(400).json({ err: err })
    }
}

const getUserById = async (req, res) => {
    try {
        const docs = await User.findById({ _id: req.params.id }, (err) => {
            if (err) throw err
        })
        if (!docs) throw {
            message: 'no content'
        }
        return res.status(200).json(docs)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const register = (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body)
    // Check validation
    if (!isValid) {
        return res.status(422).json(errors)
    }
    User.findOne({ Email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" })
        } else {
            const newUser = new User({
                full_name: req.body.name,
                Email: req.body.email,
                type: req.body.type,
                password: req.body.password
            })
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then(user => res.status(201).json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    }).catch((error) => {
        console.error(error);
    })
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
                    name: user.full_name,
                    type: user.type,
                    email: user.Email,
                    actor_id: user.actor_collection_id
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
        console.error(error);
    })
}

const recruiterProfile = (req, res) => {
    const filter = { Email: req.body.email }
    const update = {
        type: USER_TYPE[1],
    }
    if (req.body.img)
        update.profile_picture = req.body.img
    if (req.body.info)
        update.personal_information = req.body.info
    User.findOneAndUpdate(filter, update)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ err: err }))
}

const updatePassword = (req, res) => {
    const { errors, isValid } = validatePasswordInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const filter = { _id: req.params.id }
    let update = { password: req.body.password }

    // Hash password before updating database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(update.password, salt, (err, hash) => {
            if (err) throw err
            update.password = hash
            User.findOneAndUpdate(filter, update)
                .then(user => res.json(user))
                .catch(err => res.status(400).json({ err: err }))
        })
    })
}

const updateUser = (req, res) => {
    const filter = { _id: req.params.id }
    let update = {}
    if (req.body.email)
        update.Email = req.body.email
    if (req.body.full_name)
        update.full_name = req.body.full_name
    if (req.body.profile_picture)
        update.profile_picture = req.body.profile_picture
    if (req.body.personal_information)
        update.personal_information = req.body.personal_information
    User.findOneAndUpdate(filter, update)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ err: err }))
}

const deleteUser = (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(user => {
            if (user.type == USER_TYPE[0]) {
                Actor.findOneAndDelete({ user_id: user._id })
                    .then(actor => {
                        ActorAudition.deleteMany({ actor_id: actor._id })
                            .then(response => res.json(response))
                    })
            } else if (user.type == USER_TYPE[1]) {
                Audition.updateMany({ recruiter_id: user._id },
                    { $set: { is_active: false } })
                    .then(response => res.json(response))
            }
        })
        .catch(err => res.status(400).json({ err: err }))
}



export { getUsers, getUserById, register, login, recruiterProfile, updatePassword, updateUser, deleteUser }