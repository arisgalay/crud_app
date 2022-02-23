const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const HttpError = require('./middleware/http-error')
const todos = require('./routes/todos')
const users = require('./routes/users')

require('dotenv').config()
const app = express()

// cors - cross origin resource sharing
app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     )
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT PATCH, DELETE, header')

//     next()
// })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes endpoint
app.use('/api/todos', todos)
app.use('/api/users', users)

//Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    )
}
// incorrect routes error handling
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404)
    throw error
})

// //middle ware
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({
        message: error.message || 'An unknown error occured!',
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    })
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on  http://localhost:${process.env.PORT}`)
        })
    })
    .catch((err) => console.error('MongoDB connection failed: ', err.message))
