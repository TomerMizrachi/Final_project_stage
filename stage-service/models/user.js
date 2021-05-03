import mongoose from 'mongoose'
const { Schema } = mongoose;


const user = {
    full_name: String,
    Email: { type: String, required: true },
    password: { type: String, required: true },
    profile_picture: String,
    personal_information: String,
    type: String,
    actor_collection_id: Schema.Types.ObjectId
}

const userSchema = new mongoose.Schema(user, { collection: 'user' })
const User = mongoose.model('user', userSchema)

export default User
