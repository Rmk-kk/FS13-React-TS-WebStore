import './_edit-product.scss'
import React, {FormEvent, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import StoreServices from "../../../StoreServices/StoreServices";
import {CategoryType} from "../../UserPage/NewItemModal/NewItemModal";
import {Store} from "react-notifications-component";

export interface EditProductModalProps {
    edit: boolean,
    setEdit:  React.Dispatch<React.SetStateAction<boolean>>,
    category: number,
    title: string,
    images: string[],
    price: number,
    description: string,
    id: number,
}

const EditProductModal = (props:EditProductModalProps) => {
    const {edit, setEdit, title, price, description, id, category, images} = props;
    const [newName, setNewName] = useState(title);
    const [categoryId, setCategoryId] = useState<number>(category);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [newPrice, setNewPrice] = useState(price);
    const [newDesc, setNewDesc] = useState(description);
    const [newImages, setNewImages] = useState(images);
    const service = new StoreServices();

    useEffect(() => {
        service.getAllCategories()
            .then(setCategories)
            .catch(() => Store.addNotification({
                message: `Couldn't get categories`,
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

    if(!edit) {
        return null
    }

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(e.target.files) {
            const files = Array.from(e.target.files)
            const images:string[] = []
            files.forEach(image => {
                service.uploadFile(image)
                    .then((res) => {
                        images.push(res.data.location)
                    })
                    .then(() => setNewImages(images))
                    .then(() => Store.addNotification({
                        title: "Image uploaded successfully",
                        type: "success",
                        insert: "top",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 2000,
                            onScreen: true
                        }
                    }))
                    .catch(() => Store.addNotification({
                        title: "Couldn't upload the image",
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
            })
        }
    }

    const handleForm = (e:FormEvent) => {
        e.preventDefault()
        const category = categories.filter(item => item.id === categoryId)[0];
        const data = {
            'title': newName,
            'price': newPrice,
            'description': newDesc,
            'images': newImages,
            category
        }
        if(newName.length === 0 || !newName.match(/^[a-zA-Z\s]+$/)) {
            Store.addNotification({
                title: "Title can contain only letters",
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
        else if (newPrice <= 0) {
            Store.addNotification({
                title: "Price must be greater than 0",
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
        else if(newImages.length === 0) {
            Store.addNotification({
                title: "Product must have image",
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
            service.updateProduct(id, data)
                .then(() => setEdit(false))
                .then(() => Store.addNotification({
                    title: "Product was edited successfully",
                    type: "success",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                }))
                .catch(() => Store.addNotification({
                    title: "Couldn't edit the product",
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
        }
    }

    return ReactDOM.createPortal(
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
                     onSubmit={(e) => handleForm(e)}
                     autoComplete="off"
                >
                    <TextField
                        label="Product Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
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
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        multiline
                        rows={6}
                    />

                    <TextField fullWidth
                        label="Price"
                               value={newPrice}
                               onChange={(e) => setNewPrice(Number(e.target.value))}
                    />
                    <TextField fullWidth
                               type={'file'}
                               inputProps={{ multiple: true }}
                               onChange={handleFileSelected}
                    />
                    <div className='edit-product_modal-buttons'>
                        <button className='login-form_btn' onClick={() => setEdit(false)}>Close</button>
                        <button type='submit' className='login-form_btn' >Edit Product</button>
                    </div>
                </Box>
            </div>
        </>,
        document.getElementById('modal-window')!
    )
}

export default EditProductModal