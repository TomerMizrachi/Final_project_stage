import express from 'express'
import { getUsers, getUserById, register, login, recruiterProfile, updatePassword, updateUser } from '../controllers/userController.js'

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/register', register)

router.post('/login', login)

router.post('/recruiterProfile', recruiterProfile)

router.put('/password/:id', updatePassword)

router.put('/:id', updateUser)


export default router