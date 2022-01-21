const express = require('express')
const todosController = require('../controller/todo-controller')
const auth = require('../middleware/auth')
const router = express.Router()

router
    .get('/', auth, todosController.getAllTodos)
    .post('/', auth, todosController.createTodo)
    .put('/:id', auth, todosController.updateTodo)
    .patch('/:id', auth, todosController.completeTodo)
    .delete('/:id', auth, todosController.deleteTodo)

module.exports = router
