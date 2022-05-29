import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    thumbnail: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    createdBy: {
        type: String,
        default: 'anonymous'
    },
    createdByName: {
        type: String,
        default: 'anonymous'
    },
    orderIndex: {
        type: Number,
        default: 1
    },
    onlyShowRouter: {
        type: Boolean,
        default: false
    },
    isActived: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

})

const portfolioModel = mongoose.model('Portfolio', portfolioSchema)
export default portfolioModel