const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) return res.status(401).send({ message: 'Not Authorized.' })

    try {
        const secretKey = process.env.SECRET_KEY
        const payload = jwt.verify(token, secretKey)
        req.user = payload
        next()
    } catch (err) {
        res.status(400).send({ message: 'Invalid Token' })
    }
}

module.exports = auth
