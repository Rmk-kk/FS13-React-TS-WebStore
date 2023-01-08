import StoreServices from "../components/StoreServices/StoreServices";
import server from "./shared/server";

server.listen();

describe('store services testing', () => {
    const service = new StoreServices();
    test('fetch single product', async () => {
        const product = await service.fetchSingleProduct('41')
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('description');
    })

    test('get auth token', async () => {

    })

    test('create new user', async () => {

    })

    test('delete product', async () => {

    })

    test('update product', async () => {

    })

    test('add new product', async () => {

    })

    test('get all categories', async () => {

    })

    test('get all users', async () => {

    })

    test('create new category', async () => {

    })

    test('edit category', async () => {

    })
});

export {}