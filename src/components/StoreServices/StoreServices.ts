import axios from "axios";

interface UpdateUserData {
    "name" : string,
    "password" : string,
    "email" : string,
}
class StoreServices {

    private defaultUrl = 'https://api.escuelajs.co/api/v1/products'

    async fetchAll(url:string) {
        const data = await fetch(url);
        return await data.json()
    }

    async fetchSingleProduct(id:string) {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        return response.data
    }

    async getUserByToken(token:string) {
        const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
       if(response.status === 200) {
           return response.data
       } else {
           return false
       }
    }

    async updateUser(id:number, data:UpdateUserData) {
        return await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, data);
    }
}

export default StoreServices