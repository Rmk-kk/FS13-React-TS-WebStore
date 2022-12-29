import './login.scss'
import {Box, Container, TextField} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHook";
import {authenticateUser} from "../../../../redux/slices/userTokenReducer";
import {useNavigate} from "react-router-dom";

type LoginDataType = {email:string, password: string}

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
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
        setLoading(false)
    }
    const formOnSubmit = (e:FormEvent, data:LoginDataType) => {
        setLoading(true);
        e.preventDefault()
        dispatch(authenticateUser(data))
        checkAuthStatus();
        console.log(authToken)
    }

    const load = loading ? <p>Loading</p> : null;
    const err = error ? <p>Wrong username or password</p> : null;
    return(
        <Container maxWidth={"lg"}>
            <Box onSubmit={(e) => formOnSubmit(e, {email, password})}
                 component="form"
                 sx={{
                     '& .MuiTextField-root': { m: 1, width: '25ch' },
                 }}
                 className='login-form'
                 noValidate
                 autoComplete="off"
            >
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
            {load}
            {err}
        <button type='submit'>Submit</button>
            </Box>
        </Container>
    )
}

export default LoginComponent