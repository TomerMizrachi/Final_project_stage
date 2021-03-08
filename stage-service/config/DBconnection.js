import mongoose from 'mongoose'
import config from './env.js'

const env = config.env 
const url = `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}/${env.DB_COLLECTION}?retryWrites=true&w=majority`
const options = {
 useNewUrlParser: true, 
 useCreateIndex: true, 
 useUnifiedTopology: true
}

export default mongoose
 .connect(url, options)
 .then(() => console.log('connected to DB'))
 .catch(err => console.log(`connection error: ${err}`))

