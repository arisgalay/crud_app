const User = require('../models/user')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().min(3).max(200).email().required(),
        password: Joi.string().min(6).max(200).required(),
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({ message: error.details[0].message })

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send({ message: 'Email already exist.' })

        const { name, email, password } = req.body

        user = new User({
            name,
            email,
            password,
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email },
            secretKey
        )

        res.send(token)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const signIn = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).email().required(),
        password: Joi.string().min(6).max(200).required(),
    })

    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send({ message: 'Invalid email or password.' })

        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) res.status(400).send({ message: 'Invalid email or password.' })

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email },
            secretKey
        )
        res.send(token)
    } catch (error) {
        res.status(500).send(err.message)
    }
}

exports.signUp = signUp
exports.signIn = signIn
