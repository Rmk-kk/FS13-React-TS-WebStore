import './login.scss'
import {Box, Container, TextField} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHook";
import {useNavigate} from "react-router-dom";
import StoreServices from "../../../StoreServices/StoreServices";
import {getUserWithToken} from "../../../../redux/slices/userReducer";

type LoginDataType = {email:string, password: string}

const RegistrationComponent = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const service = new StoreServices();

    useEffect(() => {
        console.log(user);
        if(user) {
            navigate('/account')
        }
    }, [user])



    const uploadUser = () => {
        dispatch(getUserWithToken(localStorage.getItem('access_token')));
    }


    const load = loading ? <p>Loading</p> : null;
    const err = error ? <p>Wrong username or password</p> : null;
    return(
        <Container maxWidth={"lg"} style={{margin: 'auto'}}>

            <div className='login-form-login'>
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
                        label="text"
                        onChange={(e)=> {
                            setName(e.target.value);
                            setError(false)
                        }}
                    />
                    <TextField
                        label="Email"
                        onChange={(e)=> {
                            setEmail(e.target.value);
                            setError(false)
                        }}
                    />
                    <TextField
                        onChange={(e)=>{
                            setPassword(e.target.value);
                            setError(false)
                        }}
                        label="Password"
                    />
                    {load}
                    {err}
                    <button type='submit' className='login-form_btn'>Login</button>
                </Box>
            </div>

        </Container>
    )
}

export default RegistrationComponent