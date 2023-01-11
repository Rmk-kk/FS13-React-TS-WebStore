import '../../ProductPage/EditProductModal/_edit-product.scss'
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
    const [image, setImage] = useState('');
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

     //handle uploaded image
    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(e.target.files) {
            const files = Array.from(e.target.files)
            service.uploadFile(files[0])
                .then((res) => {
                    setImage(res.data.location)
                })
                .catch(e => console.log(e))
        }
    }

    const onSelectChange = (id:number) => {
        setCategoryId(id)
        categories.forEach(item => {
            if(item.id === id) {
                setName(item.name)
                setImage(item.image)
            }
        })
    }

     const resetAllStates = () => {
         setEditCategoryError(false);
         setEditCategorySucceed(false);
         setCategoryId('');
         setName('');
         setImage('');
         setEditCategory(false);
     }
    const onFormSubmit = (e:FormEvent) => {
        e.preventDefault();
        service.editCategory(Number(categoryId), {name, image})
            .then(res => {
                if(res.status === 201 || res.status === 200){
                    setEditCategorySucceed(true);
                } else if(res.status === 400) {
                    setEditCategoryError(true)
                }
            })
            .catch(() => setEditCategoryError(true))
        resetAllStates()
    }

    return (
        <>
            <div className='edit-product_modal-overlay'></div>
            <div className='edit-product_modal' style={{maxWidth: '400px'}}>
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
                        disabled={!name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField fullWidth
                               type='file'
                               onChange={handleFileSelected}
                               disabled={!name}
                    />
                    {image && <img src={image} alt="preview" style={{maxWidth : '200px'}}/>}
                    <div className='edit-product_modal-buttons'>
                        <button className='login-form_btn' onClick={() => {resetAllStates()}}>Close</button>
                        <button type='submit' className='login-form_btn' onClick={(e) => onFormSubmit(e)}>Edit Category</button>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default EditCategoryModal