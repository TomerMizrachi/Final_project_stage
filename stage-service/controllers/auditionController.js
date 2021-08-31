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

const getRelevantAuditions = (req, res) => {
    let relevant = []
    let typecast = {}
    if (req.query.age) {
        let ageStr = ''
        let age = Number(req.query.age)
        let i = 15
        while (i < 95) {
            if (age >= i && age < i + 6)
                ageStr = '' + i + ' - ' + (i + 5) + ''
            i = i + 5
        }
        typecast.age = ageStr
    }
    if (req.query.height) {
        let heightStr = ''
        let height = Number(req.query.height)
        if (height >= 0 && height <= 150)
            heightStr = '150 - 160'
        if (height > 150 && height <= 160)
            heightStr = '150 - 160'
        if (height > 160 && height <= 170)
            heightStr = '160 - 170'
        if (height > 170 && height <= 180)
            heightStr = '170 - 180'
        if (height > 180 && height <= 190)
            heightStr = '180 - 190'
        if (height > 190 && height <= 200)
            heightStr = '190 - 200'
        if (height > 200 && height <= 210)
            heightStr = '200 - 210'
        typecast.height = heightStr
    }
    if (req.query.gender)
        typecast.gender = req.query.gender
    if (req.query.body_structure)
        typecast.body_structure = req.query.body_structure
    if (req.query.hair)
        typecast.hair = req.query.hair
    if (req.query.eyes)
        typecast.eyes = req.query.eyes
    if (req.query.skills)
        typecast.skills = req.query.skills
    if (req.query.languages)
        typecast.languages = req.query.languages
    Audition.find({})
        .then(auditions => {
            let matchScore = 0
            let audFieldLength = 0
            let matchField = 0
            auditions.map((audition) => {
                matchScore = 0
                if (audition.typecast.age == typecast.age)
                    matchScore += 1
                if (audition.typecast.height == typecast.height)
                    matchScore += 1
                if (audition.typecast.gender == typecast.gender) {
                    matchScore += 1
                } else { matchScore -= 3 }
                if (audition.typecast.body_structure == typecast.body_structure)
                    matchScore += 1
                if (audition.typecast.hair == typecast.hair)
                    matchScore += 1
                if (audition.typecast.eyes == typecast.eyes)
                    matchScore += 1
                if (typecast.skills && audition.typecast.skills) {
                    audFieldLength = audition.typecast.skills.length
                    matchField = 0
                    typecast.skills.map(item => {
                        if (audition.typecast.skills.includes(item))
                            matchField += 1
                    })
                    if (matchField / audFieldLength > 0.3)
                        matchScore += 1
                }
                if (typecast.languages && audition.typecast.languages) {
                    audFieldLength = audition.typecast.languages.length
                    matchField = 0
                    typecast.languages.map(item => {
                        if (audition.typecast.languages.includes(item))
                            matchField += 1
                    })
                    if (matchField / audFieldLength > 0.3)
                        matchScore += 1
                }
                if (matchScore > 4) {
                    relevant.push(audition)
                }
            })
            res.json(relevant)
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
}

const getAuditionById = async (req, res) => {
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
    const filter = { _id: req.body.id }
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
    if (req.body.is_active === false ||req.body.is_active === true )
        update.is_active = req.body.is_active
    Audition.findOneAndUpdate(filter, update, {
        new: true // return the object after the update
    })
        .then(user => res.status(200).json(user))
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