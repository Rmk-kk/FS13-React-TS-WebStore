import StoreServices from "../components/StoreServices/StoreServices";
import server from "./shared/server";
const service = new StoreServices();
beforeAll(() => {
    server.listen();
})

afterAll(() => {
    server.close()
})


describe('store services testing - user', () => {
    test('get all users', async () => {
        const users = await service.getAllUsers();
        expect(users.length).toBe(4)
    })
    test('add new user', async () => {
        const newUser = {
            "name": "test user",
            "email": "test@test.com",
            "password": "test",
            "avatar": "",
        }
        const res = await service.createNewUser(newUser);
        const users = await service.getAllUsers();
        expect(res.status).toBe(200);
        expect(users.length).toBe(5)
    })
});

describe('store services testing - product', () => {
    test('fetch single product', async () => {
        const product = await service.fetchSingleProduct('41')
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('description');
    })
    test('get all products', async () => {
        const products = await service.getAllProducts();
        expect(products.length).toBe(5)
    })
    test('delete product', async () => {
        await service.deleteProduct(9);
        const products = await service.getAllProducts();
        expect(products.length).toBe(4)
    })
})

describe('store services testing - categories', () => {
    test('add new category', async () => {
        const newCategory = {
            "name": "test",
            "image": "test"
        };
        const res = await service.addNewCategory(newCategory);
        expect(res.status).toBe(200)
        expect(res.data['name']).toBe('test')
        expect(res.data['image']).toBe('test')
    })
    test('edit category', async () => {
       const res = await service.editCategory(1, {'name' : 'test edit'});
       expect(res.data[0].name).toBe('test edit')
    })
});

export {}