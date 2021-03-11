import ActorAudition from '../models/actoraudition.js'

const getAllActorAudition = async (req, res) => {
    try {
        const docs = await ActorAudition.find({})
        console.log(docs)
        return res.json(docs)
    } catch (err) {
        console.log(`query error: ${err}`)
    }
}

export { getAllActorAudition }