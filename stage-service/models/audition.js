import mongoose from 'mongoose'
const { Schema } = mongoose;


const audition = {
    recruiter_id: Schema.Types.ObjectId,
    name: String,
    type: String,
    role: String,
    text_file: String,
    due_date: String,
    availability_date: String,
    open_to_all: Boolean,
    typecast: Object, 
    is_active: Boolean
}

const auditionSchema = new mongoose.Schema(audition, { collection: 'audition' })
const Audition = mongoose.model('audition', auditionSchema)

export default Audition
