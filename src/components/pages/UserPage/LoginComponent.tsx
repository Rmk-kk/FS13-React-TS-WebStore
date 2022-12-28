import {Box, Container, TextField} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHook";
import {authenticateUser} from "../../../redux/slices/userTokenReducer";
import {useLocation, useNavigate} from "react-router-dom";

type LoginDataType = {email:string, password: string}

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const authToken = useAppSelector(state => state.tokenReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(authToken) {
            navigate('/account')
        }
    }, [authToken])

    const checkAuthStatus = () => {
        if(!authToken) {
            setError(true)
        } else {
            setError(false)
        }
    }
    const formOnSubmit = (e:FormEvent, data:LoginDataType) => {
        e.preventDefault()
        dispatch(authenticateUser(data))
        checkAuthStatus()
        console.log(authToken)
    }

    return(
        <Container maxWidth={"lg"}>
            <Box onSubmit={(e) => formOnSubmit(e, {email, password})}
                 component="form"
                 sx={{
                     '& .MuiTextField-root': { m: 1, width: '25ch' },
                 }}
                 noValidate
                 autoComplete="off"
            >
                <div>
                    <TextField
                        // error
                        // id="outlined-error-helper-text"
                        label="Email"
                        onChange={(e)=> {
                            setEmail(e.target.value);
                        }}
                        // helperText="Incorrect entry."
                    />
                    <TextField
                        // error
                        // id="outlined-error-helper-text"
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }}
                        label="Password"
                    />
                    {error && <h1>ERROR</h1>}
                </div>
                <button type='submit'>Submit</button>
            </Box>
        </Container>
    )
}

export default LoginComponent