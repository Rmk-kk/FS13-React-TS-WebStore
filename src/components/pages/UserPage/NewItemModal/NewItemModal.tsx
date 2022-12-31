import '../../ProductPage/EditProductModal/edit-product.scss'
import React from 'react'
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import StoreServices from "../../../StoreServices/StoreServices";

export type CategoryType = {
    creationAt: string,
    id: number,
    image: string,

    name: string,

    updatedAt: string,
}
export interface NewItemModalProps {
    setCreateProduct:  React.Dispatch<React.SetStateAction<boolean>>,
    createProduct: boolean,
    categories: CategoryType[]
}
const NewItemModal = (props: NewItemModalProps) => {
    const service = new StoreServices();
    const {createProduct, setCreateProduct, categories} = props;
    if(!createProduct) {
        return null
    }

    return (
        <>
            <div className='edit-product_modal-overlay'></div>
            <div className='edit-product_modal'>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    className='login-form edit-product_modal-form'
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Product Name"

                    />
                    <FormControl fullWidth>
                        <InputLabel id="create-item-categories">Categories</InputLabel>
                        <Select
                            labelId="create-item-categories"
                            id="create-item-categories"
                            label="Categories"
                        >
                            {categories.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                    />

                    <TextField fullWidth
                               label="Price"
                    />
                    <div className='edit-product_modal-buttons'>
                        <button className='login-form_btn' onClick={() => {setCreateProduct(false) }}>Close</button>
                        <button type='submit' className='login-form_btn'>Create Item</button>
                    </div>
                </Box>
            </div>

        </>
    )
}

export default NewItemModal