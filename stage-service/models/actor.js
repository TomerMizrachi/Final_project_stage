import mongoose from 'mongoose'
const { Schema } = mongoose


const actor = {
    user_id: Schema.Types.ObjectId, // key to connect with user info
    pictures: [String],
    videos: [String],
    age: Number,
    gender: String,
    body_structure: String,
    height: Number,
    hair: String,
    eyes: String,
    aboutMe: String,
    skills: [String],
    languages: [String]
}

const actorSchema = new mongoose.Schema(actor, { collection: 'actor' })
const Actor = mongoose.model('actor', actorSchema)

export default Actor

