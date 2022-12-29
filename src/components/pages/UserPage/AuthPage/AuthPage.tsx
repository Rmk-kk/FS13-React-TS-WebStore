import './login.scss'
import {Box, Container, TextField} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHook";
import {useNavigate} from "react-router-dom";
import StoreServices from "../../../StoreServices/StoreServices";
import {getUserWithToken} from "../../../../redux/slices/userReducer";
import RegistrationComponent from "../Registration/RegistrationComponent";
import LoginComponent from "../Login/LoginComponent";


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

    const loginFormHandle = (e:FormEvent, data:{email:string, password: string}) => {
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

    return(
        <Container maxWidth={"lg"} style={{margin: 'auto'}}>
            {newUser ? <RegistrationComponent/> :
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