const mongoose = require('mongoose')

// creating a user schema
const UserSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("Users", UserSchema)