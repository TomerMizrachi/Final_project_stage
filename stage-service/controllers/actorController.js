import Actor from '../models/actor.js'
import User from '../models/user.js'
import ActorAudition from '../models/actoraudition.js'
import { USER_TYPE, GENDER_TYPE, BODY_TYPE, HAIR_TYPE, EYES_TYPE, SKILL_TYPE, LANGUAGE_TYPE, HEIGHT_RANGE, TYPECAST_OBJ } from '../config/types.js'
import { validateActorInput } from '../validation/actorValidation.js'
import s3 from '../config/S3connection.js'
import { v4 as uuid } from 'uuid'

const getActors = (req, res) => {
    let condition = {}
    if (req.query.age) {
        let gt = Number(req.query.age) - 5
        let lt = Number(req.query.age) + 5
        condition.age = { $gt: gt, $lt: lt }
    }
    if (req.query.height) {
        let heightStr = req.query.height
        let heightRange = heightStr.split(' - ')
        condition.height = { $gte: Number(heightRange[0]), $lte: Number(heightRange[1]) }
    }
    if (req.query.gender)
        condition.gender = req.query.gender
    if (req.query.body_structure)
        condition.body_structure = req.query.body_structure
    if (req.query.hair)
        condition.hair = req.query.hair
    if (req.query.eyes)
        condition.eyes = req.query.eyes
    if (req.query.skills)
        condition.skills = { $all: req.query.skills }
    if (req.query.languages)
        condition.languages = { $all: req.query.languages }
    // join actor and user collection and filter by condition
    Actor.aggregate([
        { $match: condition },
        {
            $lookup: {
                from: "user",   
                localField: "user_id",
                foreignField: "_id",
                as: "user_info"
            }
        }])
        .then(actors => res.json(actors))
        .catch(err => res.status(400).json({ error: err }))
}

const getActorByUserId = async (req, res) => {
    try {
        const docs = await Actor.find({ user_id: req.query.user_id }, (err) => {
            if (err) throw err
        })
        if (!docs) throw {
            message: 'no content'
        }
        return res.json(docs[0])
    } catch (err) {
        return res.status(400).json({ err: err })
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
                eyes: req.body.eyes,
                skills: req.body.skills,
                languages: req.body.languages
            })
            Actor.create(newActoer).then(actor => {
                if (!actor) {
                    return res.status((400).json({ actor_profile: "faild to create actor profile" }))
                } else {
                    const update = {
                        actor_collection_id: actor._id,
                        profile_picture: req.body.img,
                        personal_information: req.body.info
                    }
                    User.updateOne(filter, update)
                        .then(user => console.log("printing the actor", res.json(user))
                        )
                        .catch(err => res.status(400).json({ error: err }))
                }
            }).catch(err => res.status(400).json({ error: err }))
        }
    })
}

const updateActorProfile = (req, res) => {
    // filter by actor scheme id => _id (maybe should change to => user_id or Email)
    const filter = { _id: req.body.id }
    let update = {}
    if (req.body.age)
        update.age = req.body.age
    if (req.body.body_structure)
        update.body_structure = req.body.body_structure
    if (req.body.height)
        update.height = req.body.height
    if (req.body.hair)
        update.hair = req.body.hair
    if (req.body.aboutMe)
        update.aboutMe = req.body.aboutMe
    if (req.body.skills)
        update.skills = req.body.skills
    if (req.body.languages)
        update.languages = req.body.languages
    Actor.findOneAndUpdate(filter, update)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Actor profile with id=${req.body.id}`
                });
            } else res.send({ message: "Actor was updated successfully." });
        })
        .catch(err => res.status(400).json({ err: err }))
}



const uploadPics = (req, res) => {
    const filter = { _id: req.body.id }
    if (req.body.pictures) {
        Actor.findOneAndUpdate(filter, {
            $push: {
                pictures: { $each: req.body.pictures, $positioin: 0 }
            }
        })
            .then(user => res.json(user))
            .catch(err => res.status(400).json({ error: err }))
    } else {
        res.status(400).json("there is no body pictures req")
    }
}

const deletePic = (req, res) => {
    const filter = { _id: req.body.id }
    Actor.findOneAndUpdate(filter, {
        $pull: { pictures: req.body.urlPic }
    })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({ error: err }))
}

const uploadVideos = (req, res) => {
    const filter = { _id: req.body.id }
    if (req.body.videos) {
        Actor.findOneAndUpdate(filter, {
            $push: {
                videos: { $each: req.body.videos, $positioin: 0 }
            }
        })
            .then(user => res.json(user))
            .catch(err => res.status(400).json({ err: err }))
    } else {
        res.status(400).json("there is no body videos req")
    }
}

const deleteVideo = (req, res) => {
    const filter = { _id: req.body.id }
    Actor.findOneAndUpdate(filter, {
        $pull: { videos: req.body.urlVideo }
    })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({ error: err }))
}

const deleteActor = (req, res) => {
    Actor.findOneAndDelete({ _id: req.params.id })
        .then(actor => {
            ActorAudition.deleteMany({ actor_id: actor._id })
                .then(response => res.json(response))
        })
        .catch(err => res.status(400).json({ err: err }))
}

const createS3Url = async (req, res) => {
    try {
        await s3.getSignedUrl('putObject', {
            Bucket: 'stage-videos',
            Key: uuid(),
            Expires: 300,
            ACL: 'public-read',
            ContentType: 'video/*'
        }, function (err, signedURL) {
            if (err) {
                console.log(err)
                return res.send(err)
            }
            else {
                return res.json({
                    postURL: signedURL,
                    getURL: signedURL.split("?")[0]
                })
            }
        });
    } catch (err) {
        res.send("err");
    }
}
export { createS3Url, getActors, getActorByUserId, actorProfile, updateActorProfile, uploadPics, uploadVideos, deleteActor, deletePic, deleteVideo }