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
    // res.send("THIS IS PRODUCTS")
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
