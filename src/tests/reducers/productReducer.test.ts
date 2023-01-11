import {store} from "../../redux/store";
import {fetchAllProducts, fetchCategoryProducts, onSearchFilter} from "../../redux/slices/productReducer";
import productServer from "../shared/productServer";
import StoreServices from "../../components/StoreServices/StoreServices";

const service = new StoreServices();
beforeAll(() => {
    productServer.listen();
})

afterAll(() => {
    productServer.close()
})

describe('productReducer tests', () => {
    test('products initial value', () => {
        expect(store.getState().productReducer.products.length).toBe(0);
    })

    test('fetch products with offset', async () => {
        await store.dispatch(fetchAllProducts({offset: 0, limit: 5}));
        expect(store.getState().productReducer.products.length).toBe(5);
    })

    test('fetch category products', async () => {
        await store.dispatch(fetchCategoryProducts(1));
        expect(store.getState().productReducer.products.length).toBe(3);
    })

    test('productReducer filters', async () => {
        await store.dispatch(fetchAllProducts({offset: 0, limit: 5}))
        store.dispatch(onSearchFilter('Intelligent Fresh Salad'));
        expect(store.getState().productReducer.products.length).toBe(1)
    })
})

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