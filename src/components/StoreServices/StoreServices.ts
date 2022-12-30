import axios from "axios";
import {LoginDataType, RegisterDataType} from "../pages/UserPage/AuthPage/AuthPage";

export interface UpdateUserData {
    "name" : string,
    "password" : string,
    "email" : string,
}

export interface UpdateProductData {
    "title" : string,
    "description" : string,
    "price" : number,
}
class StoreServices {
    async fetchSingleProduct(id:string) {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        return response.data
    }

    async getAuthToken (data:LoginDataType) {
        return await axios.post('https://api.escuelajs.co/api/v1/auth/login', {'email': data.email, 'password': data.password});
    }

    async createNewUser (data:RegisterDataType) {
        return await axios.post('https://api.escuelajs.co/api/v1/users/', {'email': data.email, 'password': data.password, name: data.name, avatar: 'https://via.placeholder.com/250'})
    }

    async deleteProduct (id:number) {
        return await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
    }

    async updateProduct(id:number, data:UpdateProductData) {
        return await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, data)
    }
}

export default StoreServices