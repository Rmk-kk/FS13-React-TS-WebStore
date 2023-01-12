import '../../ProductPage/EditProductModal/_edit-product.scss'
import React, {FormEvent, useEffect, useState} from 'react'
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import StoreServices from "../../../StoreServices/StoreServices";
import {Category} from "../../../types-interfaces";
import handleFileSelected from "../../../StoreServices/handleFilesUpload";
import {Store} from "react-notifications-component";

export interface EditCategoryProps {
    editCategory: boolean,
    setEditCategory:  React.Dispatch<React.SetStateAction<boolean>>,
}

const EditCategoryModal = (props:EditCategoryProps) => {
    const [name, setName] = useState('');
    const [savedName, setSavedName] = useState('');
    const [image, setImage] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState<number | string>('');
    const service = new StoreServices();
    const {editCategory, setEditCategory} = props;

    useEffect(() => {
        service.getAllCategories()
            .then(setCategories)
            .catch(() => Store.addNotification({
                title: "Couldn't upload categories",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            }))
    }, [])

     if(!editCategory) {
        return null
    }

    const onSelectChange = (id:number) => {
        setCategoryId(id)
        categories.forEach(item => {
            if(item.id === id) {
                setName(item.name)
                setSavedName(item.name)
                setImage(item.image)
            }
        })
    }

     const resetAllStates = () => {
         setCategoryId('');
         setName('');
         setImage('');
         setEditCategory(false);
     }

    const onFormSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(name.length === 0 || !name.match(/^[a-zA-Z\s]+$/)) {
            setName(savedName)
            Store.addNotification({
                title: "Сategory title can contain only letters",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1000,
                    onScreen: true
                }
            })
        }
        else {
            service.editCategory(Number(categoryId), {name, image})
                .then(res => {
                    if(res.status === 201 || res.status === 200){
                        Store.addNotification({
                            title: "Category was edited successfully",
                            type: "success",
                            insert: "top",
                            container: "bottom-right",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                                duration: 2000,
                                onScreen: true
                            }
                        })
                    }
                    else if(res.status === 400) {
                        Store.addNotification({
                            title: "Something went wrong, try again later",
                            type: "danger",
                            insert: "top",
                            container: "bottom-right",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                                duration: 2000,
                                onScreen: true
                            }
                        })
                    }
                })
                .catch(() => Store.addNotification({
                    title: "Something went wrong, try again later",
                    type: "danger",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                }))
            resetAllStates()
        }
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
                               onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFileSelected(e, setImage)}
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