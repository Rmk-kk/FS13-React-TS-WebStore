import axios from "axios";

interface UpdateUserData {
    "name" : string,
    "password" : string,
    "email" : string,
}
class StoreServices {

    private defaultUrl = 'https://api.escuelajs.co/api/v1/products'


    async fetchSingleProduct(id:string) {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        return response.data
    }

    async updateUser(id:number, data:UpdateUserData) {
        return await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, data);
    }

    async getAuthToken (data:{email: string, password : string}) {
        return await axios.post('https://api.escuelajs.co/api/v1/auth/login', {'email': data.email, 'password': data.password});
    }
}

export default StoreServices