import express from 'express'
import config from './config/env.js'
import router from './routers/router.js'
import DBconnection from './config/DBconnection.js'

const app = express()
const { SERVICE_PORT } = config


const { USER_ROUTE, ACTOR_ROUTE, AUDITION_ROUTE, ACTOR_AUDITION_ROUTE } = router

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', USER_ROUTE)
// app.use('/actor', ACTOR_ROUTE)
// app.use('/audition', AUDITION_ROUTE)
// app.use('/actor-audition', ACTOR_AUDITION_ROUTE)


app.listen(SERVICE_PORT, () => console.log(`listening on port ${SERVICE_PORT}`))

export default app
