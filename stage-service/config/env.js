const env = process.env

export default {
    env : env,
    SERVICE_PORT: env.PORT || 8001,
    AWS_ACCESS_KEY : env.AWS_ACCESS_KEY, 
    AWS_SECRET_ACCESS_KEY : env.AWS_SECRET_ACCESS_KEY,
    S3_BUCKET : env.S3_BUCKET
}

