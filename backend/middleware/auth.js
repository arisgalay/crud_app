const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    let token

    if (req.header('x-auth-token') && req.header('x-auth-token').startsWith('Bearer')) {
        try {
            token = req.header('x-auth-token').split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Not Authorized.' })
        }
    }

    if (!token) return res.status(401).json({ message: 'Invalid Token' })
}

module.exports = auth
