import mongoose from "mongoose"
import ProjectDetailModel from "../models/projectDetailModel.js"

export const getProjectDetailDetail = async (req, res) => {
    const { page } = req.query
    try {
        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await ProjectDetailModel.countDocuments({})

        const projectDetailDetail = await ProjectDetailModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

        res.status(200).json({ data: projectDetailDetail, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
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

export const getProjectDetailDetailBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query

    try {
        const title = new RegExp(searchQuery, 'i')

        const projectDetailDetail = await ProjectDetailModel.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })

        res.status(200).json({ data: projectDetailDetail })
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
    const { id: _id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send(`No ProjectDetail with that id: ${_id}`)
        }
        await ProjectDetailModel.findByIdAndRemove(_id)
        res.status(201).json({ message: 'ProjectDetail deleted successfully' })
    } catch (error) {
        res.status(409).json({ message: error.message })

    }
}
