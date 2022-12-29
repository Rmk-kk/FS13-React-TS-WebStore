import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getUserWithToken = createAsyncThunk(
    'getUserWithToken',
    async (token:string | null) => {
        const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        if(response.status === 200) {
            return response.data
        } else {
            return false
        }
    })

interface UserProfile {
    avatar: string,
    creationAt: string,
    email: string,
    id: number
    name: string,

    password: string,

    role: string,

    updatedAt: string,
}

const initialState: UserProfile | null = null;

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem('access_token')
            return null
        }
    },
    extraReducers: (build) => {
        build.addCase(getUserWithToken.fulfilled, (state, action) => {
            return action.payload
       })
    }
})

const userReducer = userSlice.reducer;
export default userReducer

export const {logout} = userSlice.actions

