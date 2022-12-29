import './login.scss'
import {Box, TextField} from "@mui/material";
import React, {FormEvent, useState} from "react";

interface LoginComponentProps {
    loginFormHandle: (e:FormEvent, data:{email:string, password: string}) => void,
    loading: boolean,
    error: boolean,

    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setNewUser:React.Dispatch<React.SetStateAction<boolean>>
}

const LoginComponent = (props:LoginComponentProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loginFormHandle, loading, error, setError} = props;

    const load = loading ? <p>Loading</p> : null;
    const err = error ? <p>Wrong username or password</p> : null;
    return(
            <div className='login-form-login'>
                <Box onSubmit={(e) => loginFormHandle(e, {email, password})}
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
                            setError(false)
                        }}
                        // helperText="Incorrect entry."
                    />
                    <TextField
                        // error
                        // id="outlined-error-helper-text"
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
    )
}

export default LoginComponent