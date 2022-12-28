import {createSlice} from "@reduxjs/toolkit";
import {Product} from "../../components/types-interfaces";

export interface CartProduct extends Product {
    quantity: number;
}

const initialState: CartProduct[] = [];
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addItem: (state, action) => {
            if(state.some(item => item.id === action.payload.id)) {
                state.map(product => {
                    if (product.id === action.payload.id) {
                        product.quantity = product.quantity + 1;
                    }
                    return product
                })
            } else {
                const newItem = {...action.payload, quantity: 1}
                state.push(newItem);
            }
        },

        removeItem:(state, action) => {
            let remove;
            state.map(product => {
                if (product.id === action.payload) {
                    if(product.quantity > 1) {
                       return product.quantity = product.quantity - 1;
                    } else {
                        remove = true;
                    }
                }
                return product
            })
            if(remove) {
                return  state.filter(item => item.id !== action.payload)
            }
        }
    }
})

const cartReducer = cartSlice.reducer;
export default cartReducer

export const {addItem, removeItem} = cartSlice.actions