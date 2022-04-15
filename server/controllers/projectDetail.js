import mongoose from "mongoose"
import ProjectDetailModel from "../models/projectDetailModel.js"

export const getProjectDetails = async (req, res) => {
    const { id } = req.params
    try {
        const projectDetail = await ProjectDetailModel.findById(id)

        res.status(200).json({ data: projectDetail })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getProjectDetailByPortfolios = async (req, res) => {
    const { id } = req.params
    try {
        const projectDetailByPortfolio = await ProjectDetailModel.find({ portfolio: id })
        console.log('projectDetailByPortfolio', projectDetailByPortfolio)

        res.status(200).json({ data: projectDetailByPortfolio })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getProjectDetailByProjects = async (req, res) => {
    const { id } = req.params
    try {
        const projectDetailByProject = await ProjectDetailModel.find({ project: id })
        console.log('projectDetailByProject', projectDetailByProject)

        res.status(200).json({ data: projectDetail })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createProjectDetail = async (req, res) => {
    const projectDetail = req.body

    const newProjectDetail = new ProjectDetailModel({ ...projectDetail, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newProjectDetail.save()

        res.status(201).json(newProjectDetail)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updateProjectDetail = async (req, res) => {
    // const { id: _id } = req.params
    // const projectDetail = req.body
    // try {
    //     if (!mongoose.Types.ObjectId.isValid(_id)) {
    //         return res.status(404).send(`No ProjectDetail with that id: ${_id}`)
    //     }
    //     const updateProjectDetailData = await ProjectDetailModel.findByIdAndUpdate(_id, { ...projectDetail, _id }, { new: true })
    //     res.status(201).json(updateProjectDetailData)
    // } catch (error) {
    //     res.status(409).json({ message: error.message })
    // }
}

export const deleteProjectDetail = async (req, res) => {
    // const { id: _id } = req.params
    // try {
    //     if (!mongoose.Types.ObjectId.isValid(_id)) {
    //         return res.status(404).send(`No ProjectDetail with that id: ${_id}`)
    //     }
    //     await ProjectDetailModel.findByIdAndRemove(_id)
    //     res.status(201).json({ message: 'ProjectDetail deleted successfully' })
    // } catch (error) {
    //     res.status(409).json({ message: error.message })

    // }
}
