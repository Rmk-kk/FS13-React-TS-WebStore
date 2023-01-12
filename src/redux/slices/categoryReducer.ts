import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CategoryList} from "../../components/types-interfaces";
import axios from "axios";
import {Store} from "react-notifications-component";

export const fetchAllCategories = createAsyncThunk('fetchAllCategories', async () => {
    try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
        return res.data
    } catch (e) {
        Store.addNotification({
                title: "Couldn't get categories, reload the page",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1500,
                    onScreen: true
                }
            })
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
            Store.addNotification({
                title: "Couldn't get categories, reload the page",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1500,
                    onScreen: true
                }
            })
            return state
        })
    }
})
const categoriesReducer = categorySlice.reducer;
export default categoriesReducer;