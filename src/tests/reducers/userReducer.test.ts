import {store} from "../../redux/store";
import userServer from "../shared/userServer";
import StoreServices from "../../components/StoreServices/StoreServices";

const service = new StoreServices();
beforeAll(() => {
    userServer.listen();
})

afterAll(() => {
    userServer.close()
})

describe('userReducer test', () => {
    test('initial state', () => {
        expect(store.getState().userReducer).toBeNull()
    })
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
    test('get auth token', async () => {
        const res = await service.getAuthToken({email: 'test', password: 'test'})
        expect(res.data).toBe( 'test_access_token' )
    })
});