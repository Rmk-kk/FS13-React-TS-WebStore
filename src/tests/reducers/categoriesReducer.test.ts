import server from "../shared/server";
import {store} from "../../redux/store";
import {fetchAllCategories} from "../../redux/slices/categoryReducer";

beforeAll(() => {
    server.listen();
})

afterAll(() => {
    server.close()
})

describe('categories reducer test', () => {
    test('categories initial value', () => {
        expect(store.getState().categoriesReducer.length).toBe(0)
    })

    test('get all categories and slice to 5', async () => {
        await store.dispatch(fetchAllCategories());
        expect(store.getState().categoriesReducer.length).toBe(5)
    })

})
