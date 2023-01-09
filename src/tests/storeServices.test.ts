import StoreServices from "../components/StoreServices/StoreServices";
import server from "./shared/server";
import {store} from "../redux/store";

server.listen();

describe('store services testing', () => {
    const service = new StoreServices();


    test('fetch single product', async () => {
        const product = await service.fetchSingleProduct('41')
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('description');
    })

    // test('add new product', async () => {
    //     const product = {
    //         "title": "test",
    //         "price": 10,
    //         "description": "test",
    //         "categoryId": 1,
    //         "images": [""]
    //     };
    //     await service.addNewProduct(product);
    //     expect(store.getState().productReducer.products.length).toBe(6)
    // })

    // test('get auth token', async () => {
    //
    // })
    //
    // test('create new user', async () => {
    //
    // })
    //
    // test('delete product', async () => {
    //
    // })
    //
    // test('update product', async () => {
    //
    // })
    //
    //
    //
    // test('get all categories', async () => {
    //
    // })
    //
    // test('get all users', async () => {
    //
    // })
    //
    // test('create new category', async () => {
    //
    // })
    //
    // test('edit category', async () => {
    //
    // })
});

export {}