import {store} from "../../redux/store";
import {addItem, permanentlyDeleteItem, removeItem, resetCart} from "../../redux/slices/cartReducer";

describe('cart reducer test', () => {
    test('cart initial value', () => {
        expect(store.getState().cartReducer.length).toBe(0);
    })

    test('add item to cart', () => {
        const newProduct = {
            "id": 4,
            "title": "Test product",
            "price": 123,
            "description": "Test product",
            "category": {
                "id": 1,
                "name": "Clothes",
                "image": ""
            },
            "images": [
                ""
            ]
        }
        store.dispatch(addItem(newProduct));
        expect(store.getState().cartReducer.length).toBe(1)
    })

    test('remove item from cart', () => {
        store.dispatch(removeItem(4));
        expect(store.getState().cartReducer.length).toBe(0)
    })

    test('add same item several times', () => {
        const newProduct = {
            "id": 4,
            "title": "Test product",
            "price": 123,
            "description": "Test product",
            "category": {
                "id": 1,
                "name": "Clothes",
                "image": ""
            },
            "images": [
                ""
            ],
            "quantity" : 4
        };
        store.dispatch(addItem(newProduct));
        store.dispatch(addItem(newProduct));
        store.dispatch(addItem(newProduct));
        expect(store.getState().cartReducer.length).toBe(1);
        expect(store.getState().cartReducer[0].quantity).toBe(3);
    })

    test('permanently remove item from cart', () => {
        store.dispatch(permanentlyDeleteItem(4));
        expect(store.getState().cartReducer.length).toBe(0);
    })

    test('reset cart', () => {
        const newProduct = {
            "id": 4,
            "title": "Test product",
            "price": 123,
            "description": "Test product",
            "category": {
                "id": 1,
                "name": "Clothes",
                "image": ""
            },
            "images": [
                ""
            ],
            "quantity" : 4
        };
        const newProduct2 = {
            "id": 5,
            "title": "Test product",
            "price": 123,
            "description": "Test product",
            "category": {
                "id": 1,
                "name": "Clothes",
                "image": ""
            },
            "images": [
                ""
            ],
            "quantity" : 4
        };
        const newProduct3 = {
            "id": 12,
            "title": "Test product",
            "price": 123,
            "description": "Test product",
            "category": {
                "id": 1,
                "name": "Clothes",
                "image": ""
            },
            "images": [
                ""
            ],
            "quantity" : 4
        };
        store.dispatch(addItem(newProduct));
        store.dispatch(addItem(newProduct2));
        store.dispatch(addItem(newProduct3));
        expect(store.getState().cartReducer.length).toBe(3);
        store.dispatch(resetCart());
        expect(store.getState().cartReducer.length).toBe(0);
    })
})
