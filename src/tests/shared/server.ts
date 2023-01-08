import {rest} from "msw";
import {setupServer} from "msw/native";

const handler = [
    //offset products
    rest.get('https://api.escuelajs.co/api/v1/products?offset=3&limit=5', (req, res, context) => {
        return res(
            context.json(
                [
                    {
                        "id": 9,
                        "title": "Intelligent Fresh Salad",
                        "price": 34,
                        "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
                        "images": [
                            "https://api.lorem.space/image/watch?w=640&h=480&r=8088",
                            "https://api.lorem.space/image/watch?w=640&h=480&r=7624",
                            "https://api.lorem.space/image/watch?w=640&h=480&r=4807"
                        ],
                        "creationAt": "2023-01-07T23:16:33.000Z",
                        "updatedAt": "2023-01-07T23:16:33.000Z",
                        "category": {
                            "id": 2,
                            "name": "Electronics",
                            "image": "https://api.lorem.space/image/watch?w=640&h=480&r=8049",
                            "creationAt": "2023-01-07T23:16:33.000Z",
                            "updatedAt": "2023-01-07T23:16:33.000Z"
                        }
                    },
                    {
                        "id": 11,
                        "title": "Generic Bronze Gloves",
                        "price": 815,
                        "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
                        "images": [
                            "https://api.lorem.space/image/watch?w=640&h=480&r=1611",
                            "https://api.lorem.space/image/watch?w=640&h=480&r=8500",
                            "https://api.lorem.space/image/watch?w=640&h=480&r=3261"
                        ],
                        "creationAt": "2023-01-07T23:16:33.000Z",
                        "updatedAt": "2023-01-07T23:16:33.000Z",
                        "category": {
                            "id": 2,
                            "name": "Electronics",
                            "image": "https://api.lorem.space/image/watch?w=640&h=480&r=8049",
                            "creationAt": "2023-01-07T23:16:33.000Z",
                            "updatedAt": "2023-01-07T23:16:33.000Z"
                        }
                    },
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
                        "id": 37,
                        "title": "Recycled Metal Sausages",
                        "price": 126,
                        "description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
                        "images": [
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=1566",
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=6504",
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=7677"
                        ],
                        "creationAt": "2023-01-07T23:16:33.000Z",
                        "updatedAt": "2023-01-07T23:16:33.000Z",
                        "category": {
                            "id": 4,
                            "name": "Shoes",
                            "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=7041",
                            "creationAt": "2023-01-07T23:16:33.000Z",
                            "updatedAt": "2023-01-07T23:16:33.000Z"
                        }
                    },
                    {
                        "id": 39,
                        "title": "Oriental Steel Pizza",
                        "price": 49,
                        "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
                        "images": [
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=3013",
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=9536",
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=4429"
                        ],
                        "creationAt": "2023-01-07T23:16:33.000Z",
                        "updatedAt": "2023-01-07T23:16:33.000Z",
                        "category": {
                            "id": 4,
                            "name": "Shoes",
                            "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=7041",
                            "creationAt": "2023-01-07T23:16:33.000Z",
                            "updatedAt": "2023-01-07T23:16:33.000Z"
                        }
                    },
                ]
            )
        )
    }),

    //category products
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
    })

    //

    //
]

const server = setupServer(...handler);
export default server