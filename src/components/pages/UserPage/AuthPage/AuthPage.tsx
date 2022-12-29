import './login.scss'
import {Box, Container, TextField} from "@mui/material";
import React, {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHook";
import {useNavigate} from "react-router-dom";
import StoreServices from "../../../StoreServices/StoreServices";
import {getUserWithToken} from "../../../../redux/slices/userReducer";
import RegistrationComponent from "../Registration/RegistrationComponent";
import LoginComponent from "../Login/LoginComponent";

export interface AuthPageProps {
    loading: boolean,
    error: boolean,

    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setNewUser:React.Dispatch<React.SetStateAction<boolean>>,
}

export interface LoginPageProps extends AuthPageProps {
    loginFormHandle: (e:FormEvent, data:LoginDataType) => void,
}

export interface RegisterPageProps extends AuthPageProps {
    registerFormHandle: (e:FormEvent, data:RegisterDataType) => void,
}
export type LoginDataType = {email:string, password: string}

export type RegisterDataType = {email:string, password: string, name: string}

const AuthPage = () => {
    const [newUser, setNewUser] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const service = new StoreServices();

    useEffect(() => {
        if(user && !newUser) {
            navigate('/account')
        }
    }, [user])


    //LOGIN
    const loginFormHandle = (e:FormEvent, data:LoginDataType) => {
        setLoading(true);
        e.preventDefault()
        service.getAuthToken(data)
            .then((res:any)=> {
                localStorage.setItem('access_token', res.data['access_token']);
            })
            .then(getUserLogin)
            .catch(() => setError(true))
        setLoading(false)
    }
    const getUserLogin = () => {
        dispatch(getUserWithToken(localStorage.getItem('access_token')));
    }

    //REGISTRATION
    const registerFormHandle = (e:FormEvent, data:RegisterDataType) => {
        setLoading(true);
        e.preventDefault();
        service.createNewUser(data)
            .then(data => console.log(data))
            .catch(()=>setError(true))
        setLoading(false)
    }

    return(
        <Container maxWidth={"lg"} style={{margin: 'auto'}}>
            {newUser ? <RegistrationComponent
                    setError={setError}
                    error={error}
                    loading={loading}
                    setNewUser={setNewUser}
                    registerFormHandle={registerFormHandle}/> :
                <LoginComponent setError={setError}
                          error={error}
                          loading={loading}
                          setNewUser={setNewUser}
                          loginFormHandle={loginFormHandle}
                />}
        </Container>
    )
}

export default AuthPage