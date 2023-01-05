import '../../ProductPage/EditProductModal/edit-product.scss'

import React, {FormEvent, useState} from 'react'
import {Box,TextField} from "@mui/material";
import StoreServices from "../../../StoreServices/StoreServices";



export interface NewCategoryModalProps {
    createCategory: boolean,
    setCreateCategory:  React.Dispatch<React.SetStateAction<boolean>>,
    setNewCategoryError:React.Dispatch<React.SetStateAction<boolean>>,
    setNewCategorySucceed: React.Dispatch<React.SetStateAction<boolean>>,
}
const NewCategoryModal = (props:NewCategoryModalProps) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<string>('');

    const service = new StoreServices();
    const {createCategory, setCreateCategory, setNewCategoryError, setNewCategorySucceed} = props;

    if(!createCategory) {
        return null
    }

    const onFormSubmit = (e:FormEvent) => {
        e.preventDefault();
        const category = {
            name, image
        }
        service.addNewCategory(category)
            .then(res => {
                if(res.status === 201){
                    setNewCategorySucceed(true);
                } else if(res.status === 400) {
                    setNewCategoryError(true)
                }
            })
            .catch(() => setNewCategoryError(true))
        resetAllStates();
    }

    const resetAllStates = () => {
        setNewCategoryError(false);
        setNewCategorySucceed(false);
        setName('')
        setImage('');
        setCreateCategory(false);
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
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <TextField fullWidth
                               label="Image URL"
                               value={image}
                               onChange={(e)=>setImage(e.target.value)}
                    />
                    <div className='edit-product_modal-buttons'>
                        <button className='login-form_btn' onClick={() => {setCreateCategory(false)}}>Close</button>
                        <button type='submit' className='login-form_btn'>Create Item</button>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default NewCategoryModal