import '../../ProductPage/EditProductModal/_edit-product.scss'
import React, {FormEvent, useState} from 'react'
import {Box,TextField} from "@mui/material";
import StoreServices from "../../../StoreServices/StoreServices";
import {Store} from "react-notifications-component";
import handleFileSelected from "../../../StoreServices/handleFilesUpload";

export interface NewCategoryModalProps {
    createCategory: boolean,
    setCreateCategory:  React.Dispatch<React.SetStateAction<boolean>>,
}

const NewCategoryModal = (props:NewCategoryModalProps) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const service = new StoreServices();
    const {createCategory, setCreateCategory} = props;

    if(!createCategory) {
        return null
    }

    const resetAllStates = () => {
        setName('')
        setImage('');
        setCreateCategory(false)
    }

    const onFormSubmit = (e:FormEvent) => {
        e.preventDefault();
        const category = {
            name, image
        }
        if(name.length === 0 || !name.match(/^[a-zA-Z\s]+$/)) {
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
        else if(image.length === 0) {
            Store.addNotification({
                title: "Category must have image",
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
            service.addNewCategory(category)
                .then(res => {
                    if(res.status === 201){
                        Store.addNotification({
                            title: "Category was created successfully",
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
                    onSubmit={e => onFormSubmit(e)}
                >
                    <TextField
                        label="Category Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <TextField fullWidth
                               disabled={!name}
                               type={"file"}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileSelected(e, setImage)}
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

export default NewCategoryModal