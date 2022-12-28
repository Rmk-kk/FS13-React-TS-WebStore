import {Container} from "@mui/material";
import { useState} from "react";
import {useAppDispatch} from "../../../hooks/reduxHook";

const UserPage = () => {
    const [newUser, setNewUser] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useAppDispatch();


    // const element = !authToken ? <LoginComponent formOnSubmit={formOnSubmit} error={error}/> : <UserContent authToken={authToken}/>
    return (
        <div className='user-page'>
            <Container maxWidth='lg'>
                <h1>hello world!</h1>
                <h2>test!</h2>
            </Container>
        </div>
    )
}

export default UserPage



