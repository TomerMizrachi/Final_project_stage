import AWS from 'aws-sdk'
import config from '../config/env.js'

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = config


var s3 = new AWS.S3({
    accessKeyId: 'AKIAUBOQDNEM3DMAQ3VB',
    secretAccessKey: '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'
});
console.log("hi", AWS_ACCESS_KEY,AWS_SECRET_ACCESS_KEY )
s3.config.update({
    region: 'eu-west-1'
})

export default s3   