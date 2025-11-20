import api from "./api";


// products apis
export const getAllProducts = (search) => api.get('/products', {params: search ? {search} : {}})
export const getProductById = (id) => api.get(`products/${id}`) 
export const getCategoryProducts = (params) => api.get('/products', { params })

//category
export const getAllCategory = () => api.get('/categories')

// review
export const createReview = (id, payload) => api.post(`/reviews/${id}`, payload)
export const getReviewByProduct = (id) => api.get(`reviews/${id}`)
export const getAllReviews = () => api.get('/reviews')

//cart
export const getCart = (config = {}) => api.get('/cart', config) 

export const incrementCart = (payload, config = {}) => api.post('/cart/add', payload, config) 

export const updateCartItemQuantity = (payload, config = {}) => api.put('/cart/update-quantity', payload, config) 

export const removeCartItem = (payload, config = {}) => api.delete('/cart/remove', { data: payload, ...config })

//checkout
export const createCheckout = (payload, config = {}) => api.post('/orders', payload, config)