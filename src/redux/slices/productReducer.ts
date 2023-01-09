import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Product, ProductList} from "../../components/types-interfaces";
import axios from "axios";

export type ProductSliceType = {
    error: boolean,
    loading: boolean,
    products: ProductList,
    productsRef: ProductList,
}

const initialState: ProductSliceType = {
    products: [],
    productsRef: [],
    error: false,
    loading: false,
};

export const fetchAllProducts = createAsyncThunk('fetchAllProducts',
    async (data:{offset: number, limit: number}) => {
    const {offset, limit} = data;
    try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
        return response.data
    } catch (error) {
        console.log(error);
    }
});


export const fetchCategoryProducts = createAsyncThunk('fetchCategoryProducts', async (id:number | string) => {
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
        sortByDropFilter: (state:ProductSliceType, action:{payload: any, type: string}) => {
            switch (action.payload) {
                case 'alphabet': {
                     state.products.sort((a:Product,b:Product) => {
                        return a.title.localeCompare(b.title)
                    })
                    break;
                }
                case 'alphabet-desc': {
                    state.products.sort((a:Product,b:Product) => {
                        return b.title.localeCompare(a.title)
                    });
                    break;
                }
                case 'price': {
                    state.products.sort((a:Product,b:Product) => {
                        return a.price - b.price
                    })
                    break;
                }
                case 'price-desc': {
                    state.products.sort((a:Product,b:Product) => {
                        return b.price - a.price
                    })
                    break;
                }
                case 'default' : {
                    return {...state, products: state.productsRef};
                }
                default: {
                    return {...state, products: state.productsRef};
                }
            }
        },

        onSearchFilter: (state:ProductSliceType, action) => {
            return {...state,
                products: state.productsRef.filter(product => {
                    if(product.title.toLowerCase().includes(action.payload.toLowerCase())){
                        return product
                    }
                })}
        },

        sortByPriceRange: (state:ProductSliceType, action) => {
            const [min, max] = action.payload;
            return {
                ...state,
                products: state.productsRef.filter(item => {
                    return (item.price >= min && item.price <= max)})}
        },

    },
    extraReducers: (build) => {
        build.addCase(fetchAllProducts.fulfilled, (state, action) => {
            if(action.payload && 'message' in action.payload) {
                console.log('fetching products error')
                return {...state, error: true, loading: false}
            }
            return {loading:false, error: false, products: action.payload, productsRef: action.payload}
        })

        build.addCase(fetchAllProducts.rejected, (state ) => {
            return {...state, error: true, loading: false}
        })

        build.addCase(fetchCategoryProducts.fulfilled, (state, action) => {
            if(!action.payload) {
                return {...state, error: true, loading: false}
            }
            if(action.payload && 'message' in action.payload) {
                console.log('fetching category products error')
                return {...state, error: true, loading: false}
            }
            return {...initialState, products: action.payload, productsRef: action.payload}
        })

        build.addCase(fetchCategoryProducts.rejected, (state) => {
            return {...state, error: true, loading: false}
        })
    }
})

const productReducer = productSlice.reducer;
export default productReducer

export const {sortByDropFilter, onSearchFilter, sortByPriceRange} = productSlice.actions