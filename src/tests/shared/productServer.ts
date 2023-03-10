import {setupServer} from "msw/native";
import {rest} from "msw";
import {fakeData} from "./fakeData";

const handler = [
    //offset products
    rest.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=5', (req, res, context) => {
        return res(
            context.json(
                fakeData.allProducts
            )
        )
    }),

    //get products by category
    rest.get('https://api.escuelajs.co/api/v1/categories/1/products', (req, res, context) => {
        return res(
            context.json(
                [
                    {
                        "id": 35,
                        "title": "Gorgeous Frozen Keyboard",
                        "price": 115,
                        "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
                        "images": [
                            "https://api.lorem.space/image/fashion?w=640&h=480&r=4332",
                            "https://api.lorem.space/image/fashion?w=640&h=480&r=7677",
                            "https://api.lorem.space/image/fashion?w=640&h=480&r=9805"
                        ],
                        "creationAt": "2023-01-07T23:16:33.000Z",
                        "updatedAt": "2023-01-07T23:16:33.000Z",
                        "category": {
                            "id": 1,
                            "name": "Clothes",
                            "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=6296",
                            "creationAt": "2023-01-07T23:16:33.000Z",
                            "updatedAt": "2023-01-07T23:16:33.000Z"
                        }
                    },
                    {
                        "id": 47,
                        "title": "Tasty Steel Chair",
                        "price": 804,
                        "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
                        "images": [
                            "https://api.lorem.space/image/fashion?w=640&h=480&r=8956",
                            "https://api.lorem.space/image/fashion?w=640&h=480&r=7446",
                            "https://api.lorem.space/image/fashion?w=640&h=480&r=5031"
                        ],
                        "creationAt": "2023-01-07T23:16:33.000Z",
                        "updatedAt": "2023-01-07T23:16:33.000Z",
                        "category": {
                            "id": 1,
                            "name": "Clothes",
                            "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=6296",
                            "creationAt": "2023-01-07T23:16:33.000Z",
                            "updatedAt": "2023-01-07T23:16:33.000Z"
                        }
                    },
                    {
                        "id": 51,
                        "title": "Intelligent Fresh Soap",
                        "price": 300,
                        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
                        "images": [
                            "https://api.lorem.space/image/fashion?w=640&h=480&r=2498",
                            "https://api.lorem.space/image/fashion?w=640&h=480&r=7114",
                            "https://api.lorem.space/image/fashion?w=640&h=480&r=6210"
                        ],
                        "creationAt": "2023-01-07T23:16:33.000Z",
                        "updatedAt": "2023-01-07T23:16:33.000Z",
                        "category": {
                            "id": 1,
                            "name": "Clothes",
                            "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=6296",
                            "creationAt": "2023-01-07T23:16:33.000Z",
                            "updatedAt": "2023-01-07T23:16:33.000Z"
                        }
                    },
                ]
            )
        )
    }),

    //get all products
    rest.get('https://api.escuelajs.co/api/v1/products?offset=3&limit=500', (req, res, context) => {
        return res(
            context.json(fakeData.allProducts)
        )
    }),

    //delete product
    rest.delete('https://api.escuelajs.co/api/v1/products/9', async (req, res, context) => {
        fakeData.allProducts = fakeData.allProducts.filter(item => item.id !== 9);
        return res(context.json(fakeData.allProducts))
    }),

    //get single product
    rest.get('https://api.escuelajs.co/api/v1/products/41', (req, res, context) => {
        return res(
            context.json(
                {
                    "id": 41,
                    "title": "Tasty Metal Cheese",
                    "price": 252,
                    "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
                    "images": [
                        "https://api.lorem.space/image/furniture?w=640&h=480&r=9331",
                        "https://api.lorem.space/image/furniture?w=640&h=480&r=3500",
                        "https://api.lorem.space/image/furniture?w=640&h=480&r=2423"
                    ],
                    "creationAt": "2023-01-07T23:16:33.000Z",
                    "updatedAt": "2023-01-07T23:16:33.000Z",
                    "category": {
                        "id": 3,
                        "name": "Furniture1",
                        "image": "https://api.lorem.space/image/furniture?w=640&h=480&r=5186",
                        "creationAt": "2023-01-07T23:16:33.000Z",
                        "updatedAt": "2023-01-08T12:29:55.000Z"
                    }
                }
            )
        )
    }),
]

const productServer = setupServer(...handler);
export default productServer