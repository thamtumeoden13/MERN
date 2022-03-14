import mongoose from "mongoose"
import ProductModel from "../models/productModel.js"

export const getProducts = async (req, res) => {
    // res.send("THIS IS PRODUCTS")
    try {
        const products = await ProductModel.find()

        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createProduct = async (req, res) => {
    // res.send("PRODUCT CREATION")
    try {
        const product = req.body

        const newProduct = new ProductModel(product)
        await newProduct.save()

        res.status(201).json(newProduct)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    const { id: _id } = req.params
    const product = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send(`No Product with that id: ${_id}`)
        }
        const updateProductData = await ProductModel.findByIdAndUpdate(_id, { ...product, _id }, { new: true })
        res.status(201).json(updateProductData)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    const { id: _id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send(`No Product with that id: ${_id}`)
        }
        await ProductModel.findByIdAndRemove(_id)
        res.status(201).json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(409).json({ message: error.message })

    }
}

export const likeProduct = async (req, res) => {
    const { id: _id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send(`No Product with that id: ${_id}`)
        }
        
        const product = await ProductModel.findById(_id)
        const updateProductData = await ProductModel.findByIdAndUpdate(_id, { likeCount: product.likeCount + 1 }, { new: true })

        res.status(201).json(updateProductData)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}