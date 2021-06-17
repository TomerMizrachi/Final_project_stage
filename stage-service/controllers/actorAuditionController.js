import ActorAudition from '../models/actoraudition.js'
import s3 from '../config/S3connection.js'
import config from '../config/env.js'
import { v4 as uuid } from 'uuid'
import { validateAAInput } from '../validation/aaValidation.js'
import mongoose from 'mongoose'

const { S3_BUCKET } = config

const getAllAA = async (req, res) => {
    try {
        if (req.query.DM) {
            console.log("dM")
            const docs = await ActorAudition.find({ "DM": req.query.DM })
            return res.json(docs)
        }

        const docs = await ActorAudition.find({})
        console.log(docs)
        return res.json(docs)
    } catch (err) {
        return res.status(400).json({ err: err })
    }
}

const getAAById = async (req, res) => {
    try {
        const docs = await ActorAudition.findById({ _id: req.params.id }, (err) => {
            if (err) throw err
        })
        if (!docs) throw {
            message: 'no content'
        }
        res.status(200).json(docs)
    } catch (err) {
        res.status(400).send(err)
    }
}

// const getAAByActorId = async (req, res) => {
//     console.log("actor id is reached")
//     try {
//         const docs = await ActorAudition.find({ actor_id: req.query.actor_id }, (err) => {
//             if (err) throw err
//         })
//         if (!docs) throw {
//             message: 'no content'
//         }
//         res.status(200).json(docs)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// }

const getAAByActorId = async (req, res) => {
    ActorAudition.aggregate([
        { $match: { actor_id: mongoose.Types.ObjectId(req.query.actor_id) } },
        {
            $lookup: {
                from: "audition",
                localField: "audition_id",
                foreignField: "_id",
                as: "auditionInfo"
            }
        }])
        .then(auditions => {
            res.json(auditions)
        })
        .catch(err => res.status(400).json({ error: err }))
}

const createAA = (req, res) => {
    const { errors, isValid } = validateAAInput(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    ActorAudition.findOne({
        audition_id: req.body.audition_id,
        actor_id: req.body.actor_id,
        DM: req.body.DM
    }).then(AA => {
        if (AA) {
            return res.status(400).json({
                errors: "You already sent to this actor invataition to this audition",
                actor: "This audition already added to trainer"
            })
        } else {
            const newAA = new ActorAudition({
                audition_id: req.body.audition_id,
                actor_id: req.body.actor_id,
                submitted: false,
                score: "0",
                DM: req.body.DM
            })
            ActorAudition.create(newAA)
                .then(aa => res.json(aa))
                .catch(err => res.status(400).json({ err: err }))
        }
    }).catch(err => res.status(400).json({ errors: err }))
}

const updateAA = (req, res) => {
    const filter = { _id: req.params.id }
    let update = {}
    if (req.body.submitted)
        update.submitted = req.body.submitted
    if (req.body.score)
        update.score = req.body.score
    // if (req.body.video) {
    //     update.video = req.body.video
    // }
    if (req.body.video) {
        console.log(req.body)
        ActorAudition.findOneAndUpdate(filter, {
            $push: {
                videos: { $each: req.body.video, $positioin: 0 }
            }
        })
            .then(aa => res.json(aa))
            .catch(err => res.status(400).json({ err: err }))
    } else {
        ActorAudition.findOneAndUpdate(filter, update)
            .then(aa => res.json(aa))
            .catch(err => res.status(400).json({ err: err }))
    }
}

const deleteAA = (req, res) => {
    ActorAudition.findOneAndDelete({ _id: req.params.id })
        .then(aa => res.json(aa))
        .catch(err => res.status(400).json({ err: err }))
}


const createS3Url = async (req, res) => {
    try {
        await s3.getSignedUrl('putObject', {
            Bucket: 'stage-videos',
            Key: uuid(),
            Expires: 300,
            ACL: 'public-read',
            ContentType: 'video/mp4'

            // ContentType: 'video/x-matroska'
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

export { getAllAA, getAAById, getAAByActorId, createAA, updateAA, deleteAA, createS3Url }