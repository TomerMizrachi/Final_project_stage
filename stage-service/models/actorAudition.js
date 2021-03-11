import mongoose from 'mongoose'
const { Schema } = mongoose;


const actorAudition = {
    _id: Schema.Types.ObjectId,
    audition_id: Schema.Types.ObjectId,
    actor_id: Schema.Types.ObjectId,
    submitted: Boolean,
    score: String,
    video: String, // s3 link
    DM: Boolean // Direct Message 
}

const actorAuditionSchema = new mongoose.Schema(actorAudition, { collection: 'actorAudition' })
const ActorAudition = mongoose.model('actorAudition', actorAuditionSchema)

export default ActorAudition

