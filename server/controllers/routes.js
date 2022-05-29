import mongoose from "mongoose"
import PortfolioModel from "../models/portfolioModel.js"
import ProjectModel from "../models/projectModel.js"

export const getRoutes = async (req, res) => {
    try {
        const [portfolios, projects] = await Promise.all([getPortfolios(), getProjects()])
        const portfoliosCopy = JSON.parse(JSON.stringify(portfolios))
        const routes = portfoliosCopy.reduce((r, a) => {
            const element = { _id: a._id, name: a.name, title: a.title, orderIndex: a.orderIndex }
            let route = ''
            const projectsChild = projects.filter(e => e.portfolioID === element._id)
            route = !!projectsChild && projectsChild.length > 0 ? '' : `han-muc-du-an/tim-kiem?portfolioname=${element.name}`

            if (element.name == 'gioi-thieu' || element.name == 'tin-tuc') {
                route = !!projectsChild && projectsChild.length > 0 ? '' : `${element.name}`
            }

            element.route = route

            const child = projectsChild.map(e => {
                let routeChild = `han-muc-du-an/tim-kiem?projectname=${e.name}`
                if (element.name == 'gioi-thieu' || element.name == 'tin-tuc') {
                    routeChild = `${e.name}`
                }
                return {
                    _id: e._id,
                    name: e.name,
                    title: e.title,
                    orderIndex: e.orderIndex,
                    route: routeChild
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
        const portfolios = await PortfolioModel.find({ isActived: true, isDeleted: false }).sort({ orderIndex: 'asc' })

        return portfolios
    } catch (error) {
        console.log('[getPortfolios-error]', error)
        return null
    }
}

const getProjects = async () => {
    try {
        const projects = await ProjectModel.find({ isActived: true, isDeleted: false }).sort({ orderIndex: 'asc' })

        return projects
    } catch (error) {
        console.log('[getProjects-error]', error)
        return null
    }
}