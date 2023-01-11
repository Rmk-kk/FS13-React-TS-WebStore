import {setupServer} from "msw/native";
import {rest} from "msw";
import {fakeData} from "./fakeData";


const handler = [
    //get all categories
    rest.get('https://api.escuelajs.co/api/v1/categories', (req, res, context) => {
        return res(
            context.json(fakeData.allCategories)
        )
    }),

    //add new category
    rest.post('https://api.escuelajs.co/api/v1/categories/', async (req,res,context) => {
        const category = await req.json();
        return res(
            context.json(category)
        )
    }),

    //edit category
    rest.put('https://api.escuelajs.co/api/v1/categories/1', async (req, res, context) => {
        const { name } = await req.json();
        fakeData.allCategories.map(item => {
            if(item.id === 1) {
                item.name = name
            }
            return item
        })
        return res(context.json(fakeData.allCategories.filter(item => item.id === 1)))
    }),
]

const categoryServer = setupServer(...handler);
export default categoryServer