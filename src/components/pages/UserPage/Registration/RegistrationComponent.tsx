import {Box, Container, TextField} from "@mui/material";
import React, {useState} from "react";
import {RegisterPageProps} from "../AuthPage/AuthPage";

const RegistrationComponent = (props:RegisterPageProps) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const {registerFormHandle, setNewUser} = props;

    return(
        <Container maxWidth={"lg"} style={{margin: 'auto'}}>
            <div className='login-form-login'>
                <h2>Sign Up</h2>
                <Box onSubmit={(e) => registerFormHandle(e, {name, email,  password})}
                     component="form"
                     sx={{
                         '& .MuiTextField-root': { m: 1, width: '25ch' },
                     }}
                     className='login-form'
                     noValidate
                     autoComplete="off"
                >
                    <TextField
                        label="Name"
                        onChange={(e)=> {
                            setName(e.target.value);
                        }}
                    />
                    <TextField
                        label="Email"
                        type={'email'}
                        onChange={(e)=> {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        type={'password'}
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }}
                        label="Password"
                    />
                    <button type='submit' className='login-form_btn'>Sign Up</button>
                </Box>
                <span className='login-form-login_switch'
                    onClick={()=>setNewUser(false)}
                >Already signed up? Login!</span>
            </div>
        </Container>
    )
}

export default RegistrationComponent