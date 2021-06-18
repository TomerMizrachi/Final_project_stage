import AWS from 'aws-sdk'
import config from '../config/env.js'

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = config

var s3 = new AWS.S3();
s3.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1'
})

export default s3