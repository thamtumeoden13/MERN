import mongoose from "mongoose"
import ProjectModel from "../models/projectModel.js"

export const getProjects = async (req, res) => {
    const { page } = req.query
    try {
        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await ProjectModel.countDocuments({})

        const projects = await ProjectModel.find().sort({ _id: -1 }) //.limit(LIMIT).skip(startIndex)
        // console.log('[server-projects]', projects)
        res.status(200).json({ data: projects })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// export const getProject = async (req, res) => {
//     const { id } = req.params
//     try {
//         const project = await ProjectModel.findById(id)

//         res.status(200).json({ data: project })
//     } catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }

// export const getProjectsBySearch = async (req, res) => {
//     const { searchQuery, tags } = req.query

//     try {
//         const title = new RegExp(searchQuery, 'i')

//         const projects = await ProjectModel.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })

//         res.status(200).json({ data: projects })
//     } catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }

export const createProject = async (req, res) => {
    const project = req.body

    const newProject = new ProjectModel({ ...project, createdBy: req.userId, createdAt: new Date().toISOString() })

    try {
        await newProject.save()

        res.status(201).json(newProject)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// export const updateProject = async (req, res) => {
//     const { id: _id } = req.params
//     const project = req.body
//     try {
//         if (!mongoose.Types.ObjectId.isValid(_id)) {
//             return res.status(404).send(`No Project with that id: ${_id}`)
//         }
//         const updateProjectData = await ProjectModel.findByIdAndUpdate(_id, { ...project, _id }, { new: true })
//         res.status(201).json(updateProjectData)
//     } catch (error) {
//         res.status(409).json({ message: error.message })
//     }
// }

// export const deleteProject = async (req, res) => {
//     const { id: _id } = req.params
//     try {
//         if (!mongoose.Types.ObjectId.isValid(_id)) {
//             return res.status(404).send(`No Project with that id: ${_id}`)
//         }
//         await ProjectModel.findByIdAndRemove(_id)
//         res.status(201).json({ message: 'Project deleted successfully' })
//     } catch (error) {
//         res.status(409).json({ message: error.message })

//     }
// }
