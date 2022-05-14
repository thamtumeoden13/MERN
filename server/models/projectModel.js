import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
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
    portfolio: {
        type: String,
        require: true
    },
    portfolioID: {
        type: String,
        default: ''
    },
    portfolioName: {
        type: String,
        default: ''
    },
    orderIndex: {
        type: Number,
        default: 1
    }
})

const projectModel = mongoose.model('Project', projectSchema)
export default projectModel