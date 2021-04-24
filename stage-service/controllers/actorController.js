import Actor from '../models/actor.js'
import User from '../models/user.js'
import { USER_TYPE, GENDER_TYPE, BODY_TYPE, HAIR_TYPE, EYES_TYPE, SKILL_TYPE, LANGUAGE_TYPE, HEIGHT_RANGE, TYPECAST_OBJ } from '../config/types.js'

const getAllActorsInfo = async (req, res) => {
    try {
        const docs = await Actor.find({})
        console.log(docs)
        return res.json(docs)
    } catch (err) {
        console.log(`query error: ${err}`)
    }
}

const actorProfile = (req, res) => {
    const filter = { Email: req.body.email }

    User.findOne({ Email: req.body.email }).then(user => {
        if (!user) {
            return res.status(400).json({ email: "there is no such user" })
        } else {
            const newActoer = new Actor({
                user_id: user._id,
                age: req.body.age,
                gender: req.body.gender,
                body_structure: req.body.body_structure,
                height: req.body.height,
                hair: req.body.hair,
                skills: req.body.skills,
                languages: req.body.languages
            })
            Actor.create(newActoer).then(actor => {
                if (!actor) {
                    return res.status((400).json({ actor_profile: "faild to create actor profile" }))
                } else {
                    const update = {
                        type: USER_TYPE[0],
                        profile_picture: req.body.img,
                        personal_information: req.body.info,
                        actor_collection_id: actor._id
                    }
                    User.updateOne(filter, update)
                        .then(user => res.json(user))
                        .catch(err => res.status(400).json({ err: err }))
                }
            })
        }
    })
}

export { getAllActorsInfo, actorProfile }