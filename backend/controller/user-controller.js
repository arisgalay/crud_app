const User = require('../models/user')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string()
            .pattern(/^[a-z ,.'-]+$/i, { name: 'alpha' })
            .min(2)
            .max(30)
            .required(),
        email: Joi.string().min(3).max(200).email().required(),
        password: Joi.string().min(6).max(200).required(),
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).json({ message: error.details[0].message })

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).json({ message: 'Invalid Credentials.' })

        const { name, email, password } = req.body

        user = new User({
            name,
            email,
            password,
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            accessToken: generateToken(user),
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const signIn = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).email().required(),
        password: Joi.string().min(6).max(200).required(),
    })

    const { error } = schema.validate(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    try {
        let user = await User.findOne({ email: req.body.email })

        if (!user || !(await bcrypt.compare(req.body.password, user.password)))
            return res.status(400).json({ message: 'Invalid Credentials.' })

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            accessToken: generateToken(user),
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const getUser = async (req, res) => {
    res.status(500).json(req.user)
}

const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h',
        }
    )
}

exports.signUp = signUp
exports.signIn = signIn
exports.getUser = getUser
