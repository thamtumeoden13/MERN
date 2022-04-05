import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        default: 'Thiết Kế Biệt Thự Kết Hợp Kinh Doanh Coffee 4 Tầng 1 Tum'
    },
    thumbnail: {
        type: String,
        default: 'https://images.pexels.com/photos/5841924/pexels-photo-5841924.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
    },
    imageUrl: {
        type: String,
        default: 'https://images.pexels.com/photos/10027186/pexels-photo-10027186.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
    },
    scale: {
        type: String,
        default: '5 Tầng'
    },
    function: {
        type: String,
        default: '4 Tầng + 1 Tum'
    },
    expense: {
        type: String,
        default: '2.800.000.000 VNĐ'
    },
    designTeam: {
        type: String,
        default: 'SundayTV team'
    },
    designYear: {
        type: String,
        default: '2022'
    },
    estimatedTime: {
        type: String,
        default: '6 Tháng'
    },
    projectID: {
        type: String,
        default: 'BT09'
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
})

const projectModel = mongoose.model('ProjectDetail', projectSchema)
export default projectModel