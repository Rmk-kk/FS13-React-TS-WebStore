import './profile.scss'
import StoreServices from "../../StoreServices/StoreServices";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../../hooks/reduxHook";
import {Container} from "@mui/material";
import PersonData from "./PersonData";

const UserContent = () => {
    const service = new StoreServices();
    const user = useAppSelector(state => state.userReducer)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const element = user ? <PersonData user={user}/> : <h1>Loading</h1>
    return (
        <Container maxWidth={"lg"}>
            {element}
        </Container>
    )
}

export default UserContent

