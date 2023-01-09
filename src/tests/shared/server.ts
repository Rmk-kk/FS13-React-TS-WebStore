import {rest} from "msw";
import {setupServer} from "msw/native";
import {all} from "axios";

let allProducts = [
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

let allUsers = [
    {
        "id": 1,
        "email": "john@mail.com",
        "password": "changeme",
        "name": "Jhon",
        "role": "customer",
        "avatar": "https://api.lorem.space/image/face?w=640&h=480&r=6440",
        "creationAt": "2023-01-08T23:40:24.000Z",
        "updatedAt": "2023-01-08T23:40:24.000Z"
    },
    {
        "id": 2,
        "email": "maria@mail.com",
        "password": "12345",
        "name": "Maria",
        "role": "customer",
        "avatar": "https://api.lorem.space/image/face?w=640&h=480&r=1901",
        "creationAt": "2023-01-08T23:40:24.000Z",
        "updatedAt": "2023-01-08T23:40:24.000Z"
    },
    {
        "id": 3,
        "email": "admin@mail.com",
        "password": "admin123",
        "name": "Admin",
        "role": "admin",
        "avatar": "https://api.lorem.space/image/face?w=640&h=480&r=7019",
        "creationAt": "2023-01-08T23:40:24.000Z",
        "updatedAt": "2023-01-08T23:40:24.000Z"
    },
    {
        "id": 4,
        "email": "john77@mail.com",
        "password": "changeme",
        "name": "Jhon77",
        "role": "customer",
        "avatar": "https://api.lorem.space/image/face?w=640&h=480&r=6440",
        "creationAt": "2023-01-09T00:04:29.000Z",
        "updatedAt": "2023-01-09T00:04:29.000Z"
    },
]

let allCategories = [
    {
        "id": 1,
        "name": "Clothes",
        "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=3248",
        "creationAt": "2023-01-08T23:40:24.000Z",
        "updatedAt": "2023-01-08T23:40:24.000Z"
    },
    {
        "id": 2,
        "name": "Electronics",
        "image": "https://api.lorem.space/image/watch?w=640&h=480&r=9458",
        "creationAt": "2023-01-08T23:40:24.000Z",
        "updatedAt": "2023-01-08T23:40:24.000Z"
    },
    {
        "id": 3,
        "name": "Furniture",
        "image": "https://api.lorem.space/image/furniture?w=640&h=480&r=9523",
        "creationAt": "2023-01-08T23:40:24.000Z",
        "updatedAt": "2023-01-08T23:40:24.000Z"
    },
    {
        "id": 4,
        "name": "Shoes",
        "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=1570",
        "creationAt": "2023-01-08T23:40:24.000Z",
        "updatedAt": "2023-01-08T23:40:24.000Z"
    },
]

const handler = [

    //PRODUCT REDUCER
    //offset products
    rest.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=5', (req, res, context) => {
        return res(
            context.json(
                allProducts
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

    //STORE SERVICES
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

    //get all users
    rest.get('https://api.escuelajs.co/api/v1/users', (req, res, context) => {
        return res(
            context.json(allUsers)
        )
    }),

    //get all categories
    rest.get('https://api.escuelajs.co/api/v1/categories', (req, res, context) => {
       return res(
           context.json(allCategories)
       )
    }),

    //add new category
    rest.post('https://api.escuelajs.co/api/v1/categories/', async (req,res,context) => {
        const category = await req.json();
        return res(
            context.json(category)
        )
    }),

    //add new user
    rest.post('https://api.escuelajs.co/api/v1/users/', async (req,res,context) => {
        const user = await req.json();
        allUsers.push(user);
        return res(
            context.json(user)
        )
    }),

    //get all products
    rest.get('https://api.escuelajs.co/api/v1/products?offset=3&limit=500', (req, res, context) => {
        return res(
            context.json(allProducts)
        )
    }),

    //delete product
    rest.delete('https://api.escuelajs.co/api/v1/products/9', async (req, res, context) => {
        allProducts = allProducts.filter(item => item.id !== 9);
        return res(context.json(allProducts))
    }),

    //edit category
    rest.put('https://api.escuelajs.co/api/v1/categories/1', async (req, res, context) => {
        const { name } = await req.json();
        allCategories.map(item => {
            if(item.id === 1) {
                item.name = name
            }
            return item
        })
        return res(context.json(allCategories.filter(item => item.id === 1)))
    })
]

const server = setupServer(...handler);
export default server


