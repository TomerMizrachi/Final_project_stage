const env = process.env

export default {
    env : env,
    SERVICE_PORT: env.PORT || 8001
}