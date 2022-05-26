import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    level: {
        type: Number,
        default: 99
    },
    orderIndex: {
        type: Number,
        default: 1
    }
})

const UserModel = mongoose.model('User', userSchema)
export default UserModel
