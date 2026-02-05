import { register, login } from '../services/user.service.js'
import User from '../models/User.js'

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

export async function getUserInfo(req, res, next) {
    try {
        const user = await User.findById(req.user.userId).select('name email')
        if (!user) return res.status(404).json({ message: 'User not found' })
        res.json({ name: user.name, email: user.email })
    } catch (err) {
        next(err)
    }
}

export function logoutUser(req, res) {
    res.json({ message: 'Logged out'})
}