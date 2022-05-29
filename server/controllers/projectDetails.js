import mongoose from "mongoose"
import ProjectDetailModel from "../models/projectDetailModel.js"


export const getProjectDetails = async (req, res) => {
    try {
        const query = { isActived: true, isDeleted: false }
        const projectDetails = await ProjectDetailModel.find(query).sort({ orderIndex: 'asc' })

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

export const getProjectDetailForShowHeaders = async (req, res) => {
    try {
        const query = { isActived: true, isDeleted: false, isShowHeader: true }
        const projectDetails = await ProjectDetailModel.find(query).sort({ orderIndex: 'asc' })

        res.status(200).json({ data: projectDetails })
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
        const query = { portfolio: id, isActived: true, isDeleted: false }
        const projectDetailByPortfolio = await ProjectDetailModel.find(query).sort({ orderIndex: 'asc' })

        res.status(200).json({ data: projectDetailByPortfolio })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getProjectDetailsByProjectID = async (req, res) => {
    const { id } = req.params
    try {
        const query = { project: id, isActived: true, isDeleted: false }
        const projectDetailByProject = await ProjectDetailModel.find(query).sort({ orderIndex: 'asc' })

        res.status(200).json({ data: projectDetailByProject })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getProjectDetailsBySearch = async (req, res) => {
    const { portfolioName, projectName, name } = req.query
    let projectDetailsResult = []
    let query = {}
    try {
        if (!!portfolioName) {
            query = { portfolioName, isActived: true, isDeleted: false }
        }

        if (!!projectName) {
            query = { projectName, isActived: true, isDeleted: false }
        }

        if (!!name) {
            query = { $text: { $search: name }, isActived: true, isDeleted: false };
        }
        
        projectDetailsResult = await ProjectDetailModel.find(query).sort({ orderIndex: 'asc' })

        res.status(200).json({ data: projectDetailsResult })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}