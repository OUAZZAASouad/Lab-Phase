import axios from 'axios';

export const category = (id) => {
    const result = axios.get(`https://ali-express1.p.rapidapi.com/productsByCategoryV2/${id}`,{
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            }})

    return result
    
}