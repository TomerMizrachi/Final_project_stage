import ActorAudition from '../models/actoraudition.js'
import s3 from '../config/S3connection.js'
import config from '../config/env.js'
import { v4 as uuid } from 'uuid'

import { validateAAInput } from '../validation/aaValidation.js'

const { S3_BUCKET } = config

const getAllAA = async (req, res) => {
    try {
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

const createAA = (req, res) => {
    const { errors, isValid } = validateAAInput(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
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

const updateAA = (req, res) => {
    const filter = { _id: req.params.id }
    let update = {}
    if (req.body.submitted)
        update.submitted = req.body.submitted
    if (req.body.score)
        update.score = req.body.score
    if (req.body.video)
        update.video = req.body.video
    ActorAudition.findOneAndUpdate(filter, update)
        .then(aa => res.json(aa))
        .catch(err => res.status(400).json({ err: err }))
}

const deleteAA = (req, res) => {
    ActorAudition.findOneAndDelete({ _id: req.params.id })
        .then(aa => res.json(aa))
        .catch(err => res.status(400).json({ err: err }))
}

const createS3Url = async (req, res) => {
    try {
        await s3.getSignedUrl('putObject', {
            Bucket: S3_BUCKET,
            Key: uuid(),
            Expires: 30000,
            ContentType: 'video/x-matroska'
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

export { getAllAA, getAAById, createAA, updateAA, deleteAA, createS3Url }