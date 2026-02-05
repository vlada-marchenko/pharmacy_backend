import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { httpError } from '../utils/httpError.js'
import jwt from 'jsonwebtoken'

export async function register({ name, email, phone, password }) {
    const existing = await User.findOne({email})
    if (existing) throw httpError(409, 'Email already exists')

        const passwordHash = await bcrypt.hash(password, 10) 

        const user = await User.create({ name, email, phone, passwordHash })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        }
}

export async function login({ email, password }) {
    const user = await User.findOne({ email })
    if (!user) throw httpError(401, 'Invalid email or password')

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) throw httpError(401, 'Invalid email or password')
    
    const token = jwt.sign(
        { userId: user.id },
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

    return {
        token, 
        user: { id: user.id, email: user.email, name: user.name }
    }
}