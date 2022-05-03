import mongoose from "mongoose"
import PortfolioModel from "../models/portfolioModel.js"
import ProjectModel from "../models/projectModel.js"

export const getRoutes = async (req, res) => {
    try {
        const [portfolios, projects] = await Promise.all([getPortfolios(), getProjects()])
        const portfoliosCopy = JSON.parse(JSON.stringify(portfolios))
        const routes = portfoliosCopy.reduce((r, a) => {
            const element = { _id: a._id, name: a.name, title: a.title }
            const projectsChild = projects.filter(e => e.portfolioID === element._id)
            element.route = !!projectsChild && projectsChild.length > 0 ? '' : `han-muc-du-an/tim-kiem?portfolioname=${element.name}`
            const child = projectsChild.map(e => {
                return {
                    _id: e._id,
                    name: e.name,
                    title: e.title,
                    route: `han-muc-du-an/tim-kiem?projectname=${e.name}`
                }
            })
            element.child = [...child]
            r = [...r || [], element]
            return r
        }, [])

        res.status(200).json({ data: routes })
    } catch (error) {
        console.log('[getRoutes-error]', error)
        res.status(404).json({ message: error.message })
    }
}

const getPortfolios = async () => {
    try {
        const portfolios = await PortfolioModel.find().sort({ _id: -1 })

        return portfolios
    } catch (error) {
        console.log('[getPortfolios-error]', error)
        return null
    }
}

const getProjects = async () => {
    try {
        const projects = await ProjectModel.find().sort({ _id: -1 })

        return projects
    } catch (error) {
        console.log('[getProjects-error]', error)
        return null
    }
}