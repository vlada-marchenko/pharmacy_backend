import jwt from 'jsonwebtoken'

export function auth(req, res, next) {
    const header = req.headers.authorization
    if (!header || !header.startsWith("Bearer")) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = header.slice(7)
    try {
        // eslint-disable-next-line no-undef
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch {
        res.status(401).json({ message: 'Unauthorized' })
    }
}