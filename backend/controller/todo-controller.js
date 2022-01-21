const Todo = require('../models/todo')
const Joi = require('joi')

const getAllTodos = async (req, res) => {
    let todos

    try {
        todos = await Todo.find()
    } catch (err) {
        res.status(500).send(err.message)
    }

    res.status(200).send(todos.map((todo) => todo.toObject({ getters: true })))
}

const createTodo = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isComplete: Joi.boolean(),
        date: Joi.date(),
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({ message: error.details[0].message })

    const { name, author, uid, isComplete, date } = req.body

    let todo = new Todo({
        name,
        author,
        uid,
        isComplete,
        date,
    })

    try {
        todo = await todo.save()
        res.status(201).send(todo)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const updateTodo = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isComplete: Joi.boolean(),
        date: Joi.date(),
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({ message: error.details[0].message })

    try {
        const existingTodo = await Todo.findById(req.params.id)

        if (!existingTodo) return res.status(404).send({ message: 'Todo not found.' })

        const { name, author, uid, isComplete, date } = req.body

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { name, author, uid, isComplete, date },
            { new: true }
        )
        res.send(updatedTodo)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const completeTodo = async (req, res) => {
    try {
        const existingTodo = await Todo.findById(req.params.id)

        if (!existingTodo) return res.status(404).send({ message: 'Todo not found.' })

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { isComplete: !existingTodo.isComplete },
            { new: true }
        )

        res.status(200).send(updatedTodo)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)

        if (!deletedTodo) return res.status(404).send({ message: 'Given id does not exist.' })

        res.status(200).send(deletedTodo)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.getAllTodos = getAllTodos
exports.createTodo = createTodo
exports.updateTodo = updateTodo
exports.completeTodo = completeTodo
exports.deleteTodo = deleteTodo
