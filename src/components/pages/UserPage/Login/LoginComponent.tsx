import {Box, TextField} from "@mui/material";
import React,{useState} from "react";
import {LoginPageProps} from "../AuthPage/AuthPage";

const LoginComponent = (props:LoginPageProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loginFormHandle, setNewUser} = props;

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
                    <button type='submit' className='login-form_btn'>Login</button>
                </Box>
                <span className='login-form-login_switch'
                      onClick={()=>setNewUser(true)}
                >Don't have an account yet?</span>
            </div>
    )
}

export default LoginComponent