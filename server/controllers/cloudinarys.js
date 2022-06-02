import mongoose from "mongoose"

export const getAllFiles = async (req, res) => {
    try {
        res.send('api setup complete')
        // const query = { isActived: true, isDeleted: false }
        // const portfolios = await PortfolioModel.find(query).sort({ orderIndex: 'asc' })
        // res.status(200).json({ data: portfolios })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const uploadFile = async (req, res) => {
    const file = req.file
    try {
        if (!file) {
            return res.status(400).json('No file uploaded!')
        }
        res.status(201).json({ file })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const uploadFiles = async (req, res) => {
    const files = req.files
    try {
        if (!files) {
            return res.status(400).json('No file uploaded!')
        }
        res.status(201).json({ files })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}