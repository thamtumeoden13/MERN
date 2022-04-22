import mongoose from "mongoose"
import PortfolioModel from "../models/portfolioModel.js"

export const getPortfolio = async (req, res) => {
    const { id } = req.params
    try {
        const portfolio = await PortfolioModel.findById(id)

        res.status(200).json({ data: portfolio })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPortfolios = async (req, res) => {
    try {
        const portfolios = await PortfolioModel.find().sort({ _id: -1 })

        res.status(200).json({ data: portfolios })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPortfolio = async (req, res) => {
    const portfolio = req.body

    const newPortfolio = new PortfolioModel({ ...portfolio, createdBy: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPortfolio.save()

        res.status(201).json(newPortfolio)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePortfolio = async (req, res) => {
    const { id: _id } = req.params
    const portfolio = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send(`No Portfolio with that id: ${_id}`)
        }
        const updatePortfolioData = await PortfolioModel.findByIdAndUpdate(_id, { ...portfolio, _id }, { new: true })
        res.status(201).json(updatePortfolioData)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deletePortfolio = async (req, res) => {
    const { id: ids } = req.params
    try {
        // if (!mongoose.Types.ObjectId.isValid(_id)) {
        //     return res.status(404).send(`No Portfolio with that id: ${_id}`)
        // }
        await PortfolioModel.deleteMany({ _id: { $in: ids.split(',') } })
        res.status(201).json({ message: 'Portfolio deleted successfully' })
    } catch (error) {
        res.status(409).json({ message: error.message })

    }
}
