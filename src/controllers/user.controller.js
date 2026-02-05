import { register, login } from '../services/user.service.js'

export async function registerUser(req, res, next) {
    try {
        const user = await register(req.body)
        res.status(201).json({ message: 'User registered', user })
    } catch (err) {
        next(err)
    }
}

export async function loginUser(req, res, next) {
    try {
        const result = await login(req.body) 
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}