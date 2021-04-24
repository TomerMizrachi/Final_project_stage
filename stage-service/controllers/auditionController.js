import Audition from '../models/audition.js'
import { validateAuditionInput } from '../validation/auditionValidation.js'


const getAuditions = async (req, res) => {
    try {
        const docs = await Audition.find({})
        return res.json(docs)
    } catch (err) {
        return res.status(400).json({ err: err })
    }
}

const getAuditionById = async (req, res) => {
    try {
        const docs = await User.findById({ _id: req.params.id }, (err) => {
            if (err) throw err
        })
        if (!docs) throw {
            message: 'no content'
        }
        return res.status(200).json(docs)
    } catch (err) {
        return res.status(400).send(err)
    }
}

const createAudition = (req, res) => {
    // Form validation
    const { errors, isValid } = validateAuditionInput(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const newAudition = new Audition({
        recruiter_id: req.body.recruiter_id,
        name: req.body.name,
        type: req.body.type,
        role: req.body.role,
        text_file: req.body.text_file,
        due_date: req.body.due_date,
        availability_date: req.body.availability_date,
        open_to_all: req.body.open_to_all,
        typecast: req.body.typecast,
        is_active: req.body.is_active
    })
    Audition.create(newAudition)
        .then(auditiom => res.json(auditiom))
        .catch(err => res.status(400).json({ err: err }))
}

const updateAudition = (req, res) => {
    const filter = { _id: req.params.id }
    let update = {}
    if (req.body.name)
        update.name = req.body.name
    if (req.body.type)
        update.type = req.body.type
    if (req.body.role)
        update.role = req.body.role
    if (req.body.text_file)
        update.text_file = req.body.text_file
    if (req.body.due_date)
        update.due_date = req.body.due_date
    if (req.body.availability_date)
        update.availability_date = req.body.availability_date
    if (req.body.open_to_all)
        update.open_to_all = req.body.open_to_all
    if (req.body.typecast)
        update.typecast = req.body.typecast
    if (req.body.is_active)
        update.is_active = req.body.is_active
    Audition.findOneAndUpdate(filter, update)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ err: err }))
}



export { getAuditions, getAuditionById, createAudition, updateAudition }