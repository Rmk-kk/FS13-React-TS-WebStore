import './profile.scss'
import StoreServices from "../../StoreServices/StoreServices";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHook";
import {Button, Container} from "@mui/material";
import createDate from "../../StoreServices/createDateFunction";
import {logout} from "../../../redux/slices/userTokenReducer";

const UserContent = () => {
    const service = new StoreServices();
    const authToken = useAppSelector(state => state.tokenReducer);
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(authToken) {
            setLoading(true);
             service.getUserByToken(authToken["access_token"])
                 .then(setUser)
                 .then(() => setLoading(false))
                 .catch(() => setError(true))
        }
    }, [authToken])


    const element = user ? <PersonData user={user}/> : <h1>Loading</h1>
    return (
        <Container maxWidth={"lg"}>
            {element}
        </Container>
    )
}

export default UserContent

export interface PersonDataProps {
    user: {
        avatar : string,
        creationAt : string,
        email : string,
        name : string,
        role : string,
        updatedAt : string,
        id: number
    }
}
const PersonData = (props:PersonDataProps) => {
    const dispatch = useAppDispatch();
    const {avatar,creationAt, email, name, role, updatedAt} = props.user;

    return(
        <div className='profile-wrap'>
            <div className='profile-wrap_image'>
                <img src={avatar} alt="profile"/>
            </div>
            <div className='profile-wrap_content'>
                <h1>Hello, {name}!</h1>
                <p className='profile-wrap_content-role'>Your current role: {role}</p>
                <p className='profile-wrap_content-email'>{email}</p>
                <p className='profile-wrap_content-register'>You are with us since {createDate(new Date(creationAt))}</p>
                <p className='profile-wrap_content-update'>You are with us since {createDate(new Date(updatedAt))}</p>
                <div className='profile-wrap_content-buttons'>
                    <Button variant="contained">Edit</Button>
                    <Button variant="outlined" onClick={() => dispatch(logout())}>Log Out</Button>
                </div>
            </div>
        </div>
    )
}