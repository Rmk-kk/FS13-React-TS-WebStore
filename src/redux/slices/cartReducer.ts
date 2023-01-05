import {createSlice} from "@reduxjs/toolkit";
import {Product} from "../../components/types-interfaces";

export interface CartProduct extends Product {
    quantity: number;
}

const initialState: CartProduct[] = (()=> {
    const data = localStorage.getItem('cart');
    if(data) {
        return JSON.parse(data)
    } else {
        return []
    }
})()

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
            localStorage.setItem('cart', JSON.stringify(state))
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
                const removedItem = state.filter(item => item.id !== action.payload)
                localStorage.setItem('cart', JSON.stringify(removedItem))
                return removedItem
            }
            localStorage.setItem('cart', JSON.stringify(state))
        },

        permanentlyDeleteItem: (state,action) => {
            const newCart = state.filter(product => {
                return product.id !== action.payload
            })
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart
        },

        resetCart:() => {
            localStorage.setItem('cart', JSON.stringify([]));
            return []
        }
    }
})

const cartReducer = cartSlice.reducer;
export default cartReducer

export const {addItem, removeItem, resetCart, permanentlyDeleteItem} = cartSlice.actions