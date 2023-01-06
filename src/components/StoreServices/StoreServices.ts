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
    "category" : {
        id: number,
        image: string,
        name: string,
        creationAt: string,
        updatedAt: string,
    }

}

export interface CreateNewProductData {
    "title": string,
    "price": number,
    "description": string,
    "categoryId": number,
    "images": string[]
}

export interface CreateNewCategoryData {
    "name": string,
    "image": string
}

export interface EditCategoryData {
    [key: string]: string
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

    async addNewProduct(data:CreateNewProductData) {
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

    async getAllUsers() {
        const response = await axios.get('https://api.escuelajs.co/api/v1/users');
        return response.data
    }

    async getAllProducts() {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products?offset=3&limit=500');
        return response.data
    }

    async addNewCategory(data:CreateNewCategoryData) {
        return await axios.post('https://api.escuelajs.co/api/v1/categories/', data)
    }

    // async uploadFile(file:File) {
    //     const reader = new FileReader()
    //     reader.readAsBinaryString(file)
    //     reader.onloadend = () => {
    //         console.log(reader.result)
    //         return axios.post('https://api.escuelajs.co/api/v1/files/upload', {
    //             headers: {'Content-Type': 'multipart/form-data'},
    //             body: {'file' : reader.result}
    //         })
    //     }
    //
    // }

    async editCategory(id:number, data:EditCategoryData) {
        return await axios.put(`https://api.escuelajs.co/api/v1/categories/${id}`, data)
    }
}

export default StoreServices