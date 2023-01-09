import '../PersonData/_profile.scss'
import {useAppSelector} from "../../../../hooks/reduxHook";
import {Container} from "@mui/material";
import PersonData from "../PersonData/PersonData";
import {useContext} from "react";
import {ThemeContext} from "../../../ThemeContext";

const UserContent = () => {
    const {darkMode} = useContext(ThemeContext)
    const user = useAppSelector(state => state.userReducer)

    const element = user ? <PersonData user={user}/> : <h1>Loading</h1>
    return (
        <div className={darkMode ? 'user-content-wrap user-content-wrap-dark' : 'user-content-wrap'}>
            <Container maxWidth={"lg"}>
                {element}
            </Container>
        </div>
    )
}

export default UserContent

