import {Box, Container, TextField} from "@mui/material";
import {useState} from "react";
import {RegisterPageProps} from "../AuthPage/AuthPage";



const RegistrationComponent = (props:RegisterPageProps) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const {loading, error, setError, registerFormHandle, setNewUser} = props;



    const load = loading ? <p>Loading</p> : null;
    const err = error ? <p>Wrong username or password</p> : null;
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