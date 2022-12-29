import './profile.scss'
import StoreServices from "../../StoreServices/StoreServices";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../../hooks/reduxHook";
import {Container} from "@mui/material";
import PersonData from "./PersonData";

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

