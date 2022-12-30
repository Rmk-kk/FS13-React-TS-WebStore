import {useAppDispatch} from "../../../../hooks/reduxHook";
import createDate from "../../../StoreServices/createDateFunction";
import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {getUserWithToken, logout, updateUserInformation} from "../../../../redux/slices/userReducer";

export interface PersonDataProps {
    user: {
        avatar : string,
        creationAt : string,
        email : string,
        name : string,
        role : string,
        updatedAt : string,
        id: number,
        password: string,
    }
}
const PersonData = (props:PersonDataProps) => {
    const dispatch = useAppDispatch();
    const {avatar,creationAt, email, name, role, updatedAt, password, id} = props.user;
    const [userMail, setUserMail] = useState(email);
    const [userName, setUserName] = useState(name);
    const [userPassword, setUserPassword] = useState(password);
    const [userUpdated, setUserUpdated] = useState(false);


    const onFormEdit = () => {
        dispatch(updateUserInformation(
            { id: id,
                changes: {
                    "name": userName,
                    "email": userMail,
                    "password": userPassword
                }
            }));
        dispatch(getUserWithToken(localStorage.getItem('access_token')));
    }

    return(
        <>
            <div className='profile-wrap'>
                <div className='profile-wrap_image'>
                    <img src={avatar} alt="profile"/>
                </div>
                <div className='profile-wrap_content'>
                    <h1>Hello, {name}!</h1>
                    <p className='profile-wrap_content-role'>Your current role: <b>{role.toUpperCase()}</b></p>
                    <Box
                        className='profile-wrap_content-form'
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField id="outlined-search"
                                   label="Your Name"
                                   type="text"
                                   value={userName}
                                   onChange={e => setUserName(e.target.value)}
                        ></TextField>

                        <TextField id="outlined-search"
                                   label="Your Email"
                                   type="email"
                                   value={userMail}
                                   onChange={e => setUserMail(e.target.value)}
                        ></TextField>

                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            value={userPassword}
                            onChange={e => setUserPassword(e.target.value)}
                        />
                        <p className='profile-wrap_content-register'>You are with us since {createDate(new Date(creationAt))}</p>
                        <p className='profile-wrap_content-update'>You updated your profile on {createDate(new Date(updatedAt))}</p>
                        <div className='profile-wrap_content-buttons'>
                            <Button variant="contained"
                                    disabled={(userMail === email && userPassword === password && userName === name)}
                                    onClick={() => onFormEdit()}>
                                Update Profile</Button>
                            <Button variant="outlined" onClick={() => dispatch(logout())}>Log Out</Button>
                        </div>
                    </Box>
                </div>
            </div>
        </>

    )
}

export default PersonData