import axios from "axios"

export const getProductsApi = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    } catch (error) {
        
    }
}