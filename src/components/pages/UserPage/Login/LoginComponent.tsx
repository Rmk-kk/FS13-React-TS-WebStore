import {Box, TextField} from "@mui/material";
import React, { useState } from "react";
import {LoginPageProps} from "../AuthPage/AuthPage";



const LoginComponent = (props:LoginPageProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loginFormHandle, loading, error, setError, setNewUser} = props;

    const load = loading ? <p>Loading</p> : null;
    const err = error ? <p>Wrong username or password</p> : null;
    return(
            <div className='login-form-login'>
                <h2>Login</h2>
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
                <span className='login-form-login_switch'
                      onClick={()=>setNewUser(true)}
                >Don't have an account yet?</span>
            </div>
    )
}

export default LoginComponent