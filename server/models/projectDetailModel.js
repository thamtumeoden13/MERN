import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
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
        require: true,
    },
    investor: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    scale: {
        type: String,
        default: ''
    },
    function: {
        type: String,
        default: ''
    },
    expense: {
        type: String,
        default: ''
    },
    designTeam: {
        type: String,
        default: ''
    },
    designYear: {
        type: String,
        default: ''
    },
    estimatedTime: {
        type: String,
        default: ''
    },
    contentEditor: {
        type: String,
        default: ''
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: [],
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
    project: {
        type: String,
        require: true
    },
    projectID: {
        type: String,
        default: ''
    },
    projectName: {
        type: String,
        default: ''
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

const projectModel = mongoose.model('ProjectDetail', projectSchema)
export default projectModel