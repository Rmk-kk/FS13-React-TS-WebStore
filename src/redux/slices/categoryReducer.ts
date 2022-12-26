import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CategoryList} from "../../components/types-interfaces";
import axios from "axios";
export const fetchAllCategories = createAsyncThunk('fetchAllCategories', async () => {
    try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
        return res.data
    } catch (e) {
        console.log(e)
    }
})

const initialState:CategoryList = [];
const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (build) => {
        build.addCase(fetchAllCategories.fulfilled, (state, action) => {
            return action.payload.filter((item: any) => item.id < 6)
        })
        build.addCase(fetchAllCategories.rejected, (state) => {
            console.log('error in getting categories');
            return state
        })
    }
})
const categoriesReducer = categorySlice.reducer;
export default categoriesReducer;