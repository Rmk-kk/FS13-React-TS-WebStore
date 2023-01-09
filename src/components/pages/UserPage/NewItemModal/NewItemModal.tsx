import '../../ProductPage/EditProductModal/_edit-product.scss'
import React, {FormEvent, useState} from 'react'
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
    setNewProductError: React.Dispatch<React.SetStateAction<boolean>>,
    setNewProductSucceed: React.Dispatch<React.SetStateAction<boolean>>,
    createProduct: boolean,
    categories: CategoryType[]
}

const NewItemModal = (props: NewItemModalProps) => {
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState<number | string>('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [image2, setImage2] = useState('');
    const service = new StoreServices();
    const {createProduct, setCreateProduct, categories, setNewProductError, setNewProductSucceed} = props;

    if(!createProduct) {
        return null
    }

    const onFormSubmit = (e:FormEvent) => {
        e.preventDefault();
        const product = {
            title,
            price,
            categoryId: Number(categoryId),
            description,
            images: [image, image2]
        }
        service.addNewProduct(product)
            .then(res => {
                if(res.status === 201){
                    setNewProductSucceed(true);
                } else if(res.status === 400) {
                    setNewProductError(true)
                }
            })
            .catch(() => setNewProductError(true))
        resetAllStates();
    }

    const resetAllStates = () => {
        setNewProductError(false);
        setNewProductSucceed(false);
        setImage('');
        setImage2('');
        setCategoryId('');
        setTitle('');
        setDescription('');
        setPrice(0);
        setCreateProduct(false);
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
                    onSubmit={e => onFormSubmit(e)}
                >
                    <TextField
                        label="Product Name"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="create-item-categories">Category</InputLabel>
                        <Select
                            labelId="create-item-categories"
                            id="create-item-categories"
                            label="Categories"
                            value={categoryId}
                            onChange={(e)=>setCategoryId(Number(e.target.value))}
                        >
                            {categories.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />

                    <TextField fullWidth
                               label="Price"
                               value={price}
                               onChange={(e)=>setPrice(Number(e.target.value))}
                    />
                    <TextField fullWidth
                               label="Image URL"
                               value={image}
                               onChange={(e)=>setImage(e.target.value)}
                    />
                    <TextField fullWidth
                               label="Image 2 URL"
                               value={image2}
                               onChange={(e)=>setImage2(e.target.value)}
                    />
                    <div className='edit-product_modal-buttons'>
                        <button className='login-form_btn' onClick={() => {setCreateProduct(false)}}>Close</button>
                        <button type='submit' className='login-form_btn'>Create Item</button>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default NewItemModal