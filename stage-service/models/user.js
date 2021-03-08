import mongoose from 'mongoose'
const { Schema } = mongoose;


const user = {
    _id : Schema.Types.ObjectId,
    full_name : String,
    Email : String,
    password : String,
    profile_picture : String,
    personal_information : String,
    type : String,
    actor_collection_id : Schema.Types.ObjectId
}

const userSchema = new mongoose.Schema(user, {collection: 'user'})
const User = mongoose.model('user', userSchema)

export default User

//
// {   "_id": { "$oid": "600ec5baf7e422841acf4481" },
//     "full_name": "Ron Shien",
//     "Email": "ron@gmail.com",
//     "password": "12345", 
//     "profile_picture": "link to S3 bucket", 
//     "personal_information": "a few words to describe yourself ", 
//     "type": "Actor or Recruiter", 
//     "actor_collection_id": { "$oid": "600ec77db6b44a44f6a29c94" } 
// }