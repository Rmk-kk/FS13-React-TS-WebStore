import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = null;

export const authenticateUser = createAsyncThunk('authenticateUser',  async (data:{email: string, password : string}) => {
    try {
        return await axios.post('https://api.escuelajs.co/api/v1/auth/login', {'email': data.email, 'password': data.password});
    } catch (e:any) {
        return e.code
    }

})

const authTokenSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

    },
    extraReducers: (build) => {
        build.addCase(authenticateUser.fulfilled, (state, action) => {
            if(action.payload && action.payload.status !== 201) {
                console.log('auth error');
                return state
            }
            return action.payload.data
        });
    }
})

const tokenReducer = authTokenSlice.reducer;
export default tokenReducer

// export const {} = userSlice.actions