const Todo = require('../models/todo')
const User = require('../models/user')
const HttpError = require('../middleware/http-error')
const Joi = require('joi')

const getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({ uid: req.user._id }).sort({ isComplete: 1 })

        res.status(200).send(todos)
    } catch (err) {
        return next(new HttpError(err.message))
    }
}

const createTodo = async (req, res, next) => {
    const schema = Joi.object({
        notes: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isComplete: Joi.boolean(),
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({ message: error.details[0].message })

    const { notes } = req.body
    let todo = new Todo({
        notes,
        author: req.user.name,
        uid: req.user._id,
    })

    try {
        todo = await todo.save()
        res.status(201).send(todo)
    } catch (err) {
        return next(new HttpError(err.message))
    }
}

const updateTodo = async (req, res, next) => {
    const schema = Joi.object({
        notes: Joi.string().min(3).max(200).required(),
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({ message: error.details[0].message })

    try {
        const existingTodo = await Todo.findById(req.params.id)

        if (!existingTodo) return res.status(404).send({ message: 'Todo not found.' })

        if (!req.user) {
            return next(new HttpError('User not found.', 401))
        }

        if (existingTodo.uid.toString() !== req.user._id) {
            return next(new HttpError('User not authorized.', 401))
        }

        const { notes } = req.body

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { notes },
            { new: true }
        )
        res.send(updatedTodo)
    } catch (err) {
        return next(new HttpError(err.message))
    }
}

const completeTodo = async (req, res, next) => {
    const schema = Joi.object({
        isComplete: Joi.boolean(),
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({ message: error.details[0].message })

    try {
        const existingTodo = await Todo.findById(req.params.id)

        if (!existingTodo) return next(new HttpError('Todo not found.', 404))

        if (!req.user) {
            return next(new HttpError('User not found.', 401))
        }

        if (existingTodo.uid.toString() !== req.user._id) {
            return next(new HttpError('User not authorized.', 401))
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { isComplete: !existingTodo.isComplete },
            { new: true }
        )

        res.status(200).send(updatedTodo)
    } catch (err) {
        return next(new HttpError(err.message))
    }
}

const deleteTodo = async (req, res, next) => {
    try {
        const existingTodo = await Todo.findById(req.params.id)

        if (!existingTodo) return next(new HttpError('Todo not found.', 404))

        if (!req.user) {
            return next(new HttpError('User not found.', 401))
        }

        if (existingTodo.uid.toString() !== req.user._id) {
            return next(new HttpError('User not authorized.', 401))
        }

        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)

        if (!deletedTodo) return next(new HttpError('Given id does not exist.', 404))

        res.status(200).send(deletedTodo)
    } catch (err) {
        return next(new HttpError(err.message))
    }
}

exports.getAllTodos = getAllTodos
exports.createTodo = createTodo
exports.updateTodo = updateTodo
exports.completeTodo = completeTodo
exports.deleteTodo = deleteTodo
