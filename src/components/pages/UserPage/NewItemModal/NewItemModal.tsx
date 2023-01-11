import '../../ProductPage/EditProductModal/_edit-product.scss'
import React, {FormEvent, useState} from 'react'
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import StoreServices from "../../../StoreServices/StoreServices";
import {Store} from "react-notifications-component";
import handleFileSelected from "../../../StoreServices/handleFilesUpload";

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
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState<number | string>('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const service = new StoreServices();
    const {createProduct, setCreateProduct, categories} = props;

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
            images: [image]
        }
        service.addNewProduct(product)
            .then(res => {
                if(res.status === 201){
                    Store.addNotification({
                        title: "Product was created successfully",
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
                } else if(res.status === 400) {
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
        resetAllStates();
    }

    const resetAllStates = () => {
        setImage('');
        setCategoryId('');
        setTitle('');
        setDescription('');
        setPrice(0);
        setCreateProduct(false)
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
                               type={'file'}
                               onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFileSelected(e, setImage)}
                    />
                    {image && <img src={image} alt="preview" style={{maxWidth : '200px'}}/>}
                    <div className='edit-product_modal-buttons' style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button className='login-form_btn' onClick={() => {
                            resetAllStates()
                        }}>Close</button>
                        <button type='submit' className='login-form_btn'>Create Item</button>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default NewItemModal