import express from 'express'
import { getUsers, getUserById, register, login } from '../controllers/userController.js'

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/register', register)

router.post('/login', login)

export default router;