import '../../ProductPage/EditProductModal/edit-product.scss'

import React, {FormEvent, useEffect, useState} from 'react'
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import StoreServices from "../../../StoreServices/StoreServices";
import {Category} from "../../../types-interfaces";



export interface EditCategoryProps {
    editCategory: boolean,
    setEditCategory:  React.Dispatch<React.SetStateAction<boolean>>,
    setEditCategoryError:React.Dispatch<React.SetStateAction<boolean>>,
    setEditCategorySucceed: React.Dispatch<React.SetStateAction<boolean>>,
}
const EditCategoryModal = (props:EditCategoryProps) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState<number | string>('');
    const service = new StoreServices();
    const {editCategory, setEditCategory, setEditCategoryError, setEditCategorySucceed} = props;

    useEffect(() => {
        service.getAllCategories()
            .then(setCategories)
            .catch(() => setEditCategoryError(true))
    }, [])

    if(!editCategory) {
        return null
    }

    const onSelectChange = (id:number) => {
        setCategoryId(id)
        categories.forEach(item => {
            if(item.id === id) {
                setImage(item.image)
                setName(item.name)
            }
        })
    }

    const onFormSubmit = (e:FormEvent) => {
        e.preventDefault();

        service.editCategory(Number(categoryId), {name, image})
            .then(res => {
                console.log(res)
                if(res.status === 201 || res.status === 200){
                    setEditCategorySucceed(true);
                } else if(res.status === 400) {
                    setEditCategoryError(true)
                }
            })
            .catch(() => setEditCategoryError(true))
        resetAllStates();
    }

    const resetAllStates = () => {
        setEditCategoryError(false);
        setEditCategorySucceed(false);
        setCategoryId('');
        setName('')
        setImage('');
        setEditCategory(false);
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
                    <FormControl fullWidth>
                        <InputLabel id="create-item-categories">Category</InputLabel>
                        <Select
                            labelId="create-item-categories"
                            id="create-item-categories"
                            label="Categories"
                            value={categoryId}
                            onChange={(e)=>{

                                onSelectChange(Number(e.target.value));
                            }}
                        >
                            {categories.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField fullWidth
                               label="Category Image URL"
                               value={image}
                               onChange={(e) => setImage(e.target.value)}
                    />
                    <div className='edit-product_modal-buttons'>
                        <button className='login-form_btn' onClick={() => {setEditCategory(false)}}>Close</button>
                        <button type='submit' className='login-form_btn' onClick={(e) => onFormSubmit(e)}>Edit Category</button>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default EditCategoryModal