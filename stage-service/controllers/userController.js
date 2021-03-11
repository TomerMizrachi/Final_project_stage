import User from '../models/user.js'

const getUsers = async (req, res) => {
    try {
        const docs = await User.find({})
        console.log(docs)
        return res.json(docs)
    } catch (err) {
        console.log(`query error: ${err}`)
    }
}

export { getUsers }