import express from 'express'
import Joi from "joi";
import { validate } from '../middlewares/validate.js';
import { getUserInfo, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9+\-\s()]{6,20}$/).optional(),
    password: Joi.string().min(8).max(72).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

router.post('/register', validate(registerSchema), registerUser)
router.post('/login', validate(loginSchema), loginUser)
router.get('/user-info', auth, getUserInfo)
router.get('/logout', auth, logoutUser)

export default router