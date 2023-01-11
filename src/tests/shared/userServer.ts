import {setupServer} from "msw/native";
import {rest} from "msw";
import {fakeData} from "./fakeData";


const handler = [
    //get all users
    rest.get('https://api.escuelajs.co/api/v1/users', (req, res, context) => {
        return res(
            context.json(fakeData.allUsers)
        )
    }),
    //add new user
    rest.post('https://api.escuelajs.co/api/v1/users/', async (req,res,context) => {
        const user = await req.json();
        fakeData.allUsers.push(user);
        return res(
            context.json(user)
        )
    }),
    //get Auth Token with email and pass
    rest.post('https://api.escuelajs.co/api/v1/auth/login', async (req, res, context) => {
        const { email, password } = await req.json();
        if(email === 'test' && password === 'test') {
            return res(
                context.json(fakeData.authToken.access_token)
            )
        }
    }),
]

const userServer = setupServer(...handler);

export default userServer