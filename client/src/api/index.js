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

//project
export const fetchProjects = () => API.get(`/projects`)
export const createProject = (payload) => API.post(`/projects`, payload)
