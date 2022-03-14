import axios from 'axios'

// const URL = 'http://localhost:5000'
const URL = 'https://mern-fullstack-project.herokuapp.com'

export const fetchPosts = () => axios.get(`${URL}/posts`);
export const createPost = (payload) => axios.post(`${URL}/posts`, payload);


export const fetchProducts = () => axios.get(`${URL}/products`)
export const createProduct = (payload) => axios.post(`${URL}/products`, payload)
export const updateProduct = (id, payload) => axios.patch(`${URL}/products/${id}`, payload)
export const deleteProduct = (id) => axios.delete(`${URL}/products/${id}`)
export const likeProduct = (id) => axios.patch(`${URL}/products/${id}/likeProduct`)