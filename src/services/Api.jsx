import axios from 'axios';

export const category = (id) => {
    return axios.get(`https://ali-express1.p.rapidapi.com/productsByCategoryV2/${id}`,{
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            }})   
}

export const product = (id) => {
    return axios.get(`https://ali-express1.p.rapidapi.com/product/${id}`,{
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            }})    
}

export const feedback = (productId) => {
    return axios.get(`https://ali-express1.p.rapidapi.com/product/${productId}/feedback/`,{
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            }})    
}