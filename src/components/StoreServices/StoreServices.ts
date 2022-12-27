import axios from "axios";


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
}

export default StoreServices