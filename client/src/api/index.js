import axios from 'axios'

const URL = 'http://localhost:5000'
// const URL = 'https://mern-fullstack-project.herokuapp.com'

const API = axios.create({ baseURL: URL })

API.interceptors.request.use((req) => {
    const localStorageProfile = JSON.parse(localStorage.getItem('profile'))
    if (localStorageProfile) {
        req.headers.authorization = `Bearer ${localStorageProfile?.token}`
    }
    return req
})

//post
export const fetchPosts = () => API.get(`/posts`);
export const createPost = (payload) => API.post(`/posts`, payload);

//product
export const fetchProduct = (id) => API.get(`/products/${id}`)
export const fetchProducts = (page) => API.get(`/products?page=${page}`)
export const fetchProductsBySearch = (searchQuery) => API.get(`/products/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createProduct = (payload) => API.post(`/products`, payload)
export const updateProduct = (id, payload) => API.patch(`/products/${id}`, payload)
export const deleteProduct = (id) => API.delete(`/products/${id}`)
export const likeProduct = (id) => API.patch(`/products/${id}/likeProduct`)
export const commentProduct = (value, id) => API.patch(`/products/${id}/commentProduct`, { value })

//auth
export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)

//portfolio
export const fetchPortfolios = () => API.get(`/portfolios`)
export const fetchPortfolio = (id) => API.get(`/portfolios/${id}`)

export const createPortfolio = (payload) => API.post(`/portfolios`, payload)
export const updatePortfolio = (id, payload) => API.patch(`/portfolios/${id}`, payload)
export const deletePortfolio = (ids) => API.delete(`/portfolios/${ids}`)

//project
export const fetchProjects = () => API.get(`/projects`)
export const fetchProject = (id) => API.get(`/projects/${id}`)

export const createProject = (payload) => API.post(`/projects`, payload)
export const updateProject = (id, payload) => API.patch(`/projects/${id}`, payload)
export const deleteProject = (ids) => API.delete(`/projects/${ids}`)

//projectDetail
export const fetchProjectDetails = () => API.get(`/projectDetails`)
export const fetchProjectDetail = (id) => API.get(`/projectDetails/${id}`)

export const fetchProjectDetailByPortfolios = (id) => API.get(`/projectDetails/portfolio/${id}`)
export const fetchProjectDetailByProjects = (id) => API.get(`/projectDetails/project/${id}`)

export const fetchProjectDetailSearchByPortfolioName = (portfolioName) => API.get(`/projectDetails/search?portfolioName=${portfolioName || 'none'}`)
export const fetchProjectDetailSearchByProjectName = (projectName) => API.get(`/projectDetails/search?projectName=${projectName || 'none'}`)

export const createProjectDetail = (payload) => API.post(`/projectDetails`, payload)
export const updateProjectDetail = (id, payload) => API.patch(`/projectDetails/${id}`, payload)
export const deleteProjectDetail = (ids) => API.delete(`/projectDetails/${ids}`)
