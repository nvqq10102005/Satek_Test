import axios from "axios"

export const getProductsApi = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/products`);
}