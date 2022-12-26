import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProductList} from "../../components/types-interfaces";
// const axios = require('axios');

const initialState: ProductList = [];

export const fetchAllProducts = createAsyncThunk('fetchAllProducts',
    async (data:{offset: number, limit: number}) => {
    const {offset, limit} = data;
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
        const data: ProductList | Error = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
});


export const fetchCategoryProducts = createAsyncThunk('fetchCategoryProducts', async (id:number) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`);
        return await response.json()
    } catch (e) {
        console.log(e)
    }
})

const productSlice = createSlice({
    name: 'productSlice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (build) => {
        build.addCase(fetchAllProducts.fulfilled, (state, action) => {
            if(action.payload && 'message' in action.payload) {
                console.log('fetching products error')
                return state
            }
            return action.payload
        })
        build.addCase(fetchAllProducts.rejected, (state) => {
            console.log('error in getting products');
            return state
        })

        build.addCase(fetchCategoryProducts.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

const productReducer = productSlice.reducer;
export default productReducer

export const {} = productSlice.actions;