import server from "../shared/server";
import {store} from "../../redux/store";
import StoreServices from "../../components/StoreServices/StoreServices";

beforeAll(() => {
    server.listen();
})

afterAll(() => {
    server.close()
})

describe('userReducer test', () => {
    test('initial state', () => {
        expect(store.getState().userReducer).toBeNull()
    })
})