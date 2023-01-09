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

});

export {}