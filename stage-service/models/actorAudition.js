import mongoose from 'mongoose'
const { Schema } = mongoose;

const video = new Schema({
    videoUrl: String,
    similarity: Number,
    exact: Number
},
    { timestamps: true }
)
// explanation on timesatmps
//  https://masteringjs.io/tutorials/mongoose/timestamps

const actor_audition = {
    audition_id: Schema.Types.ObjectId,
    actor_id: Schema.Types.ObjectId,
    submitted: Boolean,
    submittedVideo: String,
    videos: [video], // s3 link
    DM: Boolean // Direct Message 
}

const actorAuditionSchema = new mongoose.Schema(actor_audition, { collection: 'actor_audition' })
const ActorAudition = mongoose.model('actor_audition', actorAuditionSchema)

export default ActorAudition

