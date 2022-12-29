import axios from "axios";
import {LoginDataType, RegisterDataType} from "../pages/UserPage/AuthPage/AuthPage";

export interface UpdateUserData {
    "name" : string,
    "password" : string,
    "email" : string,
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
}

export default StoreServices