import express from 'express'
import Cors from 'cors'
import passport from 'passport'
import {passportConfig} from './config/passport.js'
import config from './config/env.js'
import router from './routers/router.js' 
import DBconnection from './config/DBconnection.js'



const app = express()
const { SERVICE_PORT } = config


const { USER_ROUTE, ACTOR_ROUTE, AUDITION_ROUTE, ACTOR_AUDITION_ROUTE } = router

app.use(express.json())
app.use(Cors())
app.use(express.urlencoded({ extended: true }))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', '*' ),
    next()
})
app.use(passport.initialize())
passportConfig(passport)

app.use('/user', USER_ROUTE)
app.use('/actor', ACTOR_ROUTE)
app.use('/audition', AUDITION_ROUTE)
app.use('/actor-audition', ACTOR_AUDITION_ROUTE)


app.listen(SERVICE_PORT, () => console.log(`listening on port ${SERVICE_PORT}`))

export default app
