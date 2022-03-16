import axios from 'axios'

const URL = 'http://localhost:5000'
// const URL = 'https://mern-fullstack-project.herokuapp.com'

const API = axios.create({ baseURL: URL })

API.interceptors.request.use((req) => {
    const localStorageProfile = JSON.parse(localStorage.getItem('profile'))
    console.log({ localStorageProfile })
    if (localStorageProfile) {
        req.headers.authorization = `Bearer ${localStorageProfile?.token}`
    }
    return req
})

export const fetchPosts = () => API.get(`/posts`);
export const createPost = (payload) => API.post(`/posts`, payload);

export const fetchProducts = () => API.get(`/products`)
export const createProduct = (payload) => API.post(`/products`, payload)
export const updateProduct = (id, payload) => API.patch(`/products/${id}`, payload)
export const deleteProduct = (id) => API.delete(`/products/${id}`)
export const likeProduct = (id) => API.patch(`/products/${id}/likeProduct`)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)