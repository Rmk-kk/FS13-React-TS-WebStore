import {store} from "../../redux/store";
import {fetchAllCategories} from "../../redux/slices/categoryReducer";
import categoryServer from "../shared/categoryServer";
import StoreServices from "../../components/StoreServices/StoreServices";

const service = new StoreServices();
beforeAll(() => {
    categoryServer.listen();
})

afterAll(() => {
    categoryServer.close()
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
