const mongoose = require('mongoose')

const userSchena = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 1024,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchena)
