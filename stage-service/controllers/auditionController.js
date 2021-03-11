import Audition from '../models/audition.js'

const getAuditions = async (req, res) => {
    try {
        const docs = await Audition.find({})
        console.log(docs)
        return res.json(docs)
    } catch (err) {
        console.log(`query error: ${err}`)
    }
}

export { getAuditions }