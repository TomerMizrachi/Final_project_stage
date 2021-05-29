import mongoose from 'mongoose'
const { Schema } = mongoose;


const actor_audition = {
    audition_id: Schema.Types.ObjectId,
    actor_id: Schema.Types.ObjectId,
    submitted: Boolean,
    score: String,
    video: [String], // s3 link
    DM: Boolean // Direct Message 
}

const actorAuditionSchema = new mongoose.Schema(actor_audition, { collection: 'actor_audition' })
const ActorAudition = mongoose.model('actor_audition', actorAuditionSchema)

export default ActorAudition

