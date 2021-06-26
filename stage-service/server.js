import express from 'express'
import Cors from 'cors'
import passport from 'passport'
import fileUpload from 'express-fileupload';

import { passportConfig } from './config/passport.js'
import config from './config/env.js'
import router from './routers/router.js'
import path from 'path'

import DBconnection from './config/DBconnection.js'



const app = express()
const { SERVICE_PORT } = config


const { USER_ROUTE, ACTOR_ROUTE, AUDITION_ROUTE, ACTOR_AUDITION_ROUTE } = router

app.use(express.json())
app.use(Cors())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
        res.setHeader('Access-Control-Allow-Headers', '*'),
        next()
})
app.use(passport.initialize())
app.use(fileUpload({
    createParentPath: true,
    useTempFiles : true,
}));

passportConfig(passport)

app.use('/user', USER_ROUTE)
app.use('/actor', ACTOR_ROUTE)
app.use('/audition', AUDITION_ROUTE)
app.use('/actor-audition', ACTOR_AUDITION_ROUTE)


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../stage-client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../stage-client/build', 'index.html'));
  });



app.listen(SERVICE_PORT, () => console.log(`listening on port ${SERVICE_PORT}`))

export default app
