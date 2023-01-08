import {store} from "../../redux/store";
import {fetchAllProducts, fetchCategoryProducts} from "../../redux/slices/productReducer";
import server from "../shared/server";

server.listen();
describe('test product reducers', () => {

    test('products initial value', () => {
        expect(store.getState().productReducer.products.length).toBe(0);
    })

    test('fetch products with offset', async () => {
        await store.dispatch(fetchAllProducts({offset: 3, limit: 5}));
        expect(store.getState().productReducer.products.length).toBe(5);
    })

    test('fetch category products', async () => {
        await store.dispatch(fetchCategoryProducts(1));
        expect(store.getState().productReducer.products.length).toBe(3);
    })

})

export  {}