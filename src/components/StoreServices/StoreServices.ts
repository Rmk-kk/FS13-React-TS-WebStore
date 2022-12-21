

class StoreServices {

    private defaultUrl = 'https://api.escuelajs.co/api/v1/products'

    async fetchAll(url:string) {
        const data = await fetch(url);
        return await data.json()
    }
}

export default StoreServices