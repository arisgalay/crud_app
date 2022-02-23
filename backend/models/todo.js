const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        uid: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        notes: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
        },
        author: {
            type: mongoose.Schema.Types.String,
            required: true,
            minlength: 2,
            maxlength: 30,
            ref: 'User',
        },
        isComplete: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Todo', todoSchema)
