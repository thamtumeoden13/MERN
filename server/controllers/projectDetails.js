import mongoose from "mongoose"
import ProjectDetailModel from "../models/projectDetailModel.js"


export const getProjectDetails = async (req, res) => {
    try {
        const projectDetails = await ProjectDetailModel.find().sort({ _id: -1 })

        res.status(200).json({ data: projectDetails })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getProjectDetail = async (req, res) => {
    const { id } = req.params
    try {
        const projectDetail = await ProjectDetailModel.findById(id)

        res.status(200).json({ data: projectDetail })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createProjectDetail = async (req, res) => {
    const projectDetail = req.body

    const newProjectDetail = new ProjectDetailModel({ ...projectDetail, createdBy: req.userId, createdAt: new Date().toISOString() })

    try {
        await newProjectDetail.save()

        res.status(201).json(newProjectDetail)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updateProjectDetail = async (req, res) => {
    const { id: _id } = req.params
    const projectDetail = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send(`No ProjectDetail with that id: ${_id}`)
        }
        const updateProjectDetailData = await ProjectDetailModel.findByIdAndUpdate(_id, { ...projectDetail, _id }, { new: true })
        res.status(201).json(updateProjectDetailData)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteProjectDetail = async (req, res) => {
    const { id: ids } = req.params
    try {
        // if (!mongoose.Types.ObjectId.isValid(_id)) {
        //     return res.status(404).send(`No ProjectDetail with that id: ${_id}`)
        // }
        await ProjectDetailModel.deleteMany({ _id: { $in: ids.split(',') } })
        res.status(201).json({ message: 'ProjectDetail deleted successfully' })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const getProjectDetailsByPortfolioID = async (req, res) => {
    const { id } = req.params
    try {
        const projectDetailByPortfolio = await ProjectDetailModel.find({ portfolio: id })

        res.status(200).json({ data: projectDetailByPortfolio })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getProjectDetailsByProjectID = async (req, res) => {
    const { id } = req.params
    try {
        const projectDetailByProject = await ProjectDetailModel.find({ project: id })

        res.status(200).json({ data: projectDetailByProject })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getProjectDetailsBySearch = async (req, res) => {
    const { portfolioName, projectName, name } = req.query
    let projectDetailsResult
    try {
        if (!!portfolioName) {
            projectDetailsResult = await ProjectDetailModel.find({ portfolioName })
        }

        if (!!projectName) {
            projectDetailsResult = await ProjectDetailModel.find({ projectName })
        }
        if (!!name) {
            const query = { $text: { $search: name } };

            projectDetailsResult = await ProjectDetailModel.find(query)
        }

        res.status(200).json({ data: projectDetailsResult })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}