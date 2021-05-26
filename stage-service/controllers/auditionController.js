import Audition from '../models/audition.js'
import { validateAuditionInput } from '../validation/auditionValidation.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
//Michal: Remove, as line 14 describes exactly the same??
const getAuditions = async (req, res) => {
    try {
        const docs = await Audition.find({})
        return res.json(docs)
    } catch (err) {
        return res.status(400).json({ err: err })
    }
}

const getRelevantAuditions = (req, res) => {
    var dot = require('dot-object');
    let condition = {}
    let typecast = {}
    condition.typecast = typecast
    // console.log(condition)
    if (req.query.age) {
        let gt = Number(req.query.age) - 5
        let lt = Number(req.query.age) + 5
        condition = { $gt: gt, $lt: lt }
    }
    if (req.query.height) {
        let heightStr = req.query.height
        let heightRange = heightStr.split(' - ')
        condition.height = { $gte: Number(heightRange[0]), $lte: Number(heightRange[1]) }
    }
    if (req.query.gender)
        condition.typecast.gender = req.query.gender

    if (req.query.body_structure)
        condition.body_structure = req.query.body_structure
    if (req.query.hair)
        condition.hair = req.query.hair
    if (req.query.eyes)
        condition.typecast.eyes = req.query.eyes
    if (req.query.skills)
        condition.skills = { $all: req.query.skills }
    if (req.query.languages)
        condition.languages = { $all: req.query.languages }
    // console.log(condition)

    //transform to dot notation, as specified in mongoDB documentation:
    //https://docs.mongodb.com/manual/tutorial/query-embedded-documents/
    var tgt = dot.dot(condition);
    console.log(tgt)
    Audition.find(tgt)
        .then(auditions => res.json(auditions))
        .catch(err => res.status(400).json({ err: err }))
}

const getAuditionById = async (req, res) => {
    console.log("audition id has reached")
    try {
        const docs = await Audition.findById({ _id: req.query.audition_id }, (err) => {
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

// recruiter audition by id or by id and status if req.query
const recruiterAudition = (req, res) => {
    const open_to_all = req.query.open_to_all
    let condition = open_to_all ? { recruiter_id: req.query.id, open_to_all: open_to_all } :
        { recruiter_id: req.query.id }
    Audition.find(condition)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ err: err }))
}



export { getAuditions, getAuditionById, createAudition, updateAudition, recruiterAudition, getRelevantAuditions }