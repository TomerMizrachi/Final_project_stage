import mongoose from 'mongoose'
const { Schema } = mongoose;


const audition = {
    _id: Schema.Types.ObjectId,
    recruiter_id: Schema.Types.ObjectId,
    name: String,
    type: String,
    role: String,
    text_file: String,
    type: String,
    due_date: String,
    availability_date: String,
    open_to_all: Boolean,
    typecast: String, // typecast obj
    is_active: Boolean
}

const auditionSchema = new mongoose.Schema(audition, { collection: 'audition' })
const Audition = mongoose.model('audition', auditionSchema)

export default Audition
