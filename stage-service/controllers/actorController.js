import Actor from '../models/actor.js'

const getAllActorsInfo = async (req, res) => {
    try {
        const docs = await Actor.find({})
        console.log(docs)
        return res.json(docs)
    } catch (err) {
        console.log(`query error: ${err}`)
    }
}

export { getAllActorsInfo }