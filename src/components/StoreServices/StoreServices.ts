import axios from "axios";
import {LoginDataType, RegisterDataType} from "../pages/UserPage/AuthPage/AuthPage";
import {Category} from "../types-interfaces";

export interface UpdateUserData {
    "name" : string,
    "password" : string,
    "email" : string,
}

export interface UpdateProductData {
    "title" : string,
    "description" : string,
    "price" : number,
    "category" : {
        creationAt: string,
        id: number,
        image: string,
        name: string,
        updatedAt: string,
    }

}

export interface createNewProductData {
    "title": string,
    "price": number,
    "description": string,
    "categoryId": number,
    "images": string[]
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

    async addNewProduct(data:createNewProductData) {
        data.images = data.images.map(image => {
            if(!image) {
                return 'https://api.lorem.space/image/album?w=640&h=480'
            }
            return image
        })
        return await axios.post('https://api.escuelajs.co/api/v1/products/', data)
    }

    async getAllCategories() {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
        return response.data
    }
}

export default StoreServices