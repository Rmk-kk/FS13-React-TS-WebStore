import './_login.scss'
import {Container} from "@mui/material";
import React, {FormEvent, useContext, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHook";
import {useNavigate} from "react-router-dom";
import StoreServices from "../../../StoreServices/StoreServices";
import {getUserWithToken} from "../../../../redux/slices/userReducer";
import RegistrationComponent from "../Registration/RegistrationComponent";
import LoginComponent from "../Login/LoginComponent";
import {ThemeContext} from "../../../ThemeContext";
import { Store } from 'react-notifications-component';


export interface LoginPageProps{
    loginFormHandle: (e:FormEvent, data:LoginDataType) => void,
    setNewUser:React.Dispatch<React.SetStateAction<boolean>>,
}

export interface RegisterPageProps{
    setNewUser:React.Dispatch<React.SetStateAction<boolean>>,
    registerFormHandle: (e:FormEvent, data:RegisterDataType) => void,
}

export type LoginDataType = {email:string, password: string}

export type RegisterDataType = {email:string, password: string, name: string}

const AuthPage = () => {
    const {darkMode} = useContext(ThemeContext)
    const [newUser, setNewUser] = useState(false);
    const user = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const service = new StoreServices();

    useEffect(() => {
        const userData = localStorage.getItem('access_token');
        if(userData) {
            dispatch(getUserWithToken(localStorage.getItem('access_token')));
        }
        if(user && !newUser) {
            navigate('/account')
        }
    }, [user])

    //LOGIN
    const loginFormHandle = (e:FormEvent, data:LoginDataType) => {
        e.preventDefault()
        service.getAuthToken(data)
            .then((res:any)=> {
                localStorage.setItem('access_token', res.data['access_token']);
            })
            .then(getUserLogin)
            .then(()=>Store.addNotification({
                title: "Logged in successfully",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            }))
            .catch(() => Store.addNotification({
                    title: "Oops!",
                    message: `Wrong username or password`,
                    type: "danger",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                }))
    }

    const getUserLogin = () => {
        dispatch(getUserWithToken(localStorage.getItem('access_token')));
    }

    //REGISTRATION
    const registerFormHandle = (e:FormEvent, data:RegisterDataType) => {
        e.preventDefault();
        service.createNewUser(data)
            .then(() => setNewUser(false))
            .then(() => Store.addNotification({
                title: "Great!",
                message: "User created successfully!",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            }))
            .catch((e) => Store.addNotification({
                    title: "Oops!",
                    message: `${e.response.data.message[0]}}`,
                    type: "danger",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                }))
    }

    return(
        <div className={darkMode ? 'login-wrap login-wrap-dark' : 'login-wrap'}>
            <Container maxWidth={"lg"} style={{margin: 'auto'}}>
                {newUser ?
                    <RegistrationComponent
                        setNewUser={setNewUser}
                        registerFormHandle={registerFormHandle}/> :
                    <LoginComponent setNewUser={setNewUser}
                                    loginFormHandle={loginFormHandle}
                    />}
            </Container>
        </div>
    )
}

export default AuthPage