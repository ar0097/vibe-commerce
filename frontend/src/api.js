import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";

export const getProducts = () => axios.get(`${API_BASE_URL}/api/products`);

export const getCart = () => axios.get(`${API_BASE_URL}/api/cart`);

export const addToCart = (productId, qty = 1) =>
    axios.post(`${API_BASE_URL}/api/cart`, { productId, qty });

export const removeFromCart = (id) =>
    axios.delete(`${API_BASE_URL}/api/cart/${id}`);

export const checkout = (cartItems) =>
    axios.post(`${API_BASE_URL}/api/checkout`, { cartItems });
