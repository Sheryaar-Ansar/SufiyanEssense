import api from "./api";


// products apis
export const getAllProducts = () => api.get('/products')
export const getProductById = (id) => api.get(`products/${id}`) 

//category
export const getAllCategory = () => api.get('/categories')

// review
export const createReview = (id, payload) => api.post(`/reviews/${id}`, payload)
export const getReviewByProduct = (id) => api.get(`reviews/${id}`)
export const getAllReviews = () => api.get('/reviews')

//cart
export const getCart = (config = {}) => api.get('/cart', config)
export const createCart = (payload, config = {}) => api.post('/cart/add', payload, config)