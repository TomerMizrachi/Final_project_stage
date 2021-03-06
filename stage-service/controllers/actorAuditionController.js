import ActorAudition from '../models/actorAudition.js'
import s3 from '../config/S3connection.js'
import config from '../config/env.js'
import { v4 as uuid } from 'uuid'
import { validateAAInput } from '../validation/aaValidation.js'
import mongoose from 'mongoose'
import Audition from '../models/audition.js'
import path from 'path'
import fs from 'fs'
import randomstring from 'randomstring'


const getAllAA = async (req, res) => {
    try {
        if (req.query.DM) {
            const docs = await ActorAudition.find({ "DM": req.query.DM })
            return res.json(docs)
        }
        const docs = await ActorAudition.find({})
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

const getSubmmited = async (req, res) => {
    Audition.aggregate([
        { $match: { recruiter_id: mongoose.Types.ObjectId(req.query.id) } },
        {
            $lookup: {
                from: "actor_audition",
                let: { audition_id: "$_id" },
                pipeline: [{
                    $match: {
                        $expr: {
                            $and: [{ $eq: ["$audition_id", "$$audition_id"] },
                            { $eq: ["$submitted", true] }]
                        }
                    }
                },
                {
                    $lookup: {
                        from: "actor",
                        let: { actor_id: "$actor_id" },
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$actor_id"]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "user",
                                localField: "_id",
                                foreignField: "actor_collection_id",
                                as: "user_info"
                            }
                        }],
                        as: "actorInfo"
                    }
                }
                ],
                as: "actor_audition"
            },
        }])
        .then(submitted => {
            let result = []
            submitted.map((audition) => {
                if (audition.actor_audition.length > 0) {
                    result.push(audition)
                }
            })
            res.json(result)
        })
        .catch(err => res.status(400).json({ error: err }))
}

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
                score: 0,
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
    if (req.body.submitted) {
        update.submitted = req.body.submitted
        update.submittedVideo = req.body.submittedVideo
    }
    if (req.body.score)
        update.score = req.body.score
    if (req.body.video) {
        ActorAudition.findOneAndUpdate(filter, {
            $push: {
                videos: req.body.video
            }
        })
            .then(aa => res.json(aa))
            .catch(err => res.status(400).json({ error: err }))    // }
    }
    else {
        ActorAudition.findOneAndUpdate(filter, update)
            .then(aa => res.json(aa))
            .catch(err => res.status(400).json({ error: err }))
    }
}

const deleteAA = (req, res) => {
    ActorAudition.findOneAndDelete({ _id: req.params.id })
        .then(aa => res.json(aa))
        .catch(err => res.status(400).json({ err: err }))
}
const getS3UrlHelper =  ()=>{
    return new Promise((resolve,reject)=>{
        s3.getSignedUrl('putObject', {
            Bucket: 'stage-videos',
            Key: uuid(),
            Expires: 300,
            ACL: 'public-read',
            ContentType: 'video/mp4'
        }, function (err, signedURL) {
            if (err) {
                reject()
            }
            else {
                 resolve({
                    postURL: signedURL,
                    getURL: signedURL.split("?")[0]
                })
            }
        });
    });
        
    
}

const createS3Url = async (req, res) => {
    const response = await getS3UrlHelper();
    console.log(response);
    return res.json(response)
}

const uploadAuditionVideos  = async (req, res) => {

    let files =Array.isArray(req.files.files) ?  req.files.files :  [req.files.files] ;
    let filePaths = []
    let promises =[]
    files.forEach(file => {
        console.log("1")
        console.log("2")
        filePaths.push(file.tempFilePath);
    });
    const output=path.resolve('tmp/' + randomstring.generate(8) +'.mp4')
    
    await mergeFfmpeg(filePaths,output);

    console.log("3")
    fs.readFile(output, (err, data) => {
        if (err) throw err;
        console.log("4")
        const params = {
            Bucket: 'stage-videos',
            Key: uuid(),
            Expires: 300,
            ACL: 'public-read',
            ContentType: 'video/mp4',
            Body: data
        };
        s3.upload(params, function(s3Err, data) {
            console.log("5")
            res.send({videoUrl:data.Location});
        });  
     });
    
}

export { getAllAA, getAAById, getSubmmited, getAAByActorId, createAA, updateAA, deleteAA, createS3Url, uploadAuditionVideos }