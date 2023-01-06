import '../PersonData/profile.scss'
import StoreServices from "../../../StoreServices/StoreServices";
import {useAppSelector} from "../../../../hooks/reduxHook";
import {Container} from "@mui/material";
import PersonData from "../PersonData/PersonData";

const UserContent = () => {
    const service = new StoreServices();
    const user = useAppSelector(state => state.userReducer)

    const element = user ? <PersonData user={user}/> : <h1>Loading</h1>
    return (
        <Container maxWidth={"lg"}>
            {element}
        </Container>
    )
}

export default UserContent

