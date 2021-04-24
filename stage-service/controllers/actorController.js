import Actor from '../models/actor.js'
import User from '../models/user.js'
import ActorAudition from '../models/actoraudition.js'
import { USER_TYPE, GENDER_TYPE, BODY_TYPE, HAIR_TYPE, EYES_TYPE, SKILL_TYPE, LANGUAGE_TYPE, HEIGHT_RANGE, TYPECAST_OBJ } from '../config/types.js'
import { validateActorInput } from '../validation/actorValidation.js'

const getAllActorsInfo = async (req, res) => {
    try {
        const docs = await Actor.find({})
        return res.json(docs)
    } catch (err) {
        return res.status(400).json({ err: err })
    }
}

const getActorById = async (req, res) => {
    try {
        const docs = await Actor.findById({ _id: req.params.id }, (err) => {
            if (err) throw err
        })
        if (!docs) throw {
            message: 'no content'
        }
        return res.status(200).json(docs)
    } catch (err) {
        return res.status(400).send(err)
    }
}

const actorProfile = (req, res) => {
    const { errors, isValid } = validateActorInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const filter = { Email: req.body.email }
    User.findOne({ Email: req.body.email }).then(user => {
        if (!user) {
            return res.status(400).json({ email: "there is no such user" })
        } else {
            const newActoer = new Actor({
                user_id: user._id,
                age: req.body.age,
                gender: req.body.gender,
                body_structure: req.body.body_structure,
                height: req.body.height,
                hair: req.body.hair,
                skills: req.body.skills,
                languages: req.body.languages
            })
            Actor.create(newActoer).then(actor => {
                if (!actor) {
                    return res.status((400).json({ actor_profile: "faild to create actor profile" }))
                } else {
                    const update = {
                        type: USER_TYPE[0],
                        actor_collection_id: actor._id,
                        profile_picture: req.body.img,
                        personal_information: req.body.info
                    }
                    User.updateOne(filter, update)
                        .then(user => res.json(user))
                        .catch(err => res.status(400).json({ err: err }))
                }
            })
        }
    })
}

const updateActorProfile = (req, res) => {
    // filter by actor scheme id => _id (maybe should change to => user_id or Email)
    const filter = { _id: req.params.id }
    let update = {}
    if (req.body.age)
        update.age = req.body.age
    if (req.body.genser)
        update.genser = req.body.genser
    if (req.body.body_structure)
        update.body_structure = req.body.body_structure
    if (req.body.height)
        update.height = req.body.height
    if (req.body.hair)
        update.hair = req.body.hair
    if (req.body.skills)
        update.skills = req.body.skills
    if (req.body.languages)
        update.languages = req.body.languages
    Actor.findOneAndUpdate(filter, update)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ err: err }))
}

const uploadBook = (req, res) => {
    const filter = { _id: req.params.id }
    let update = {}
    if (req.body.pictures)
        update.pictures = req.body.pictures
    Actor.findOneAndUpdate(filter, update)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ err: err }))
}

const uploadVideos = (req, res) => {
    const filter = { _id: req.params.id }
    let update = {}
    if (req.body.videos)
        update.videos = req.body.videos
    Actor.findOneAndUpdate(filter, update)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ err: err }))
}

const deleteActor = (req, res) => {
    Actor.findOneAndDelete({ _id: req.params.id })
        .then(actor => {
            ActorAudition.deleteMany({ actor_id: actor._id })
            .then(response => res.json(response))
        })
        .catch(err => res.status(400).json({ err: err }))
}

export { getAllActorsInfo, getActorById, actorProfile, updateActorProfile, uploadBook, uploadVideos, deleteActor }