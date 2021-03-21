import ActorAudition from '../models/actoraudition.js'
import s3 from '../config/S3connection.js'
import config from '../config/env.js'
import { v4 as uuid } from 'uuid'

const { S3_BUCKET } = config

const getAllActorAudition = async (req, res) => {
    try {
        const docs = await ActorAudition.find({})
        console.log(docs)
        return res.json(docs)
    } catch (err) {
        console.log(`query error: ${err}`)
    }
}


const createS3Url = async (req, res) => {
    try {
        await s3.getSignedUrl('putObject', {
            Bucket: S3_BUCKET,
            Key: uuid(),
            Expires: 300,
            ACL: 'public-read',
            ContentType: 'video/webm'
        }, function (err, signedURL) {
            if (err) {
                console.log(err)
                return next(err)
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

export { getAllActorAudition, createS3Url }