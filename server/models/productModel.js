import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
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
    orderIndex: {
        type: Number,
        default: 1
    }
})

const ProductModel = mongoose.model('Product', productSchema)
export default ProductModel