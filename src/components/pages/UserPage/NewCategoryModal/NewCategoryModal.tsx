import '../../ProductPage/EditProductModal/_edit-product.scss'
import React, {FormEvent, useEffect, useState} from 'react'
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
    const [image, setImage] = useState('');
    const service = new StoreServices();
    const {createCategory, setCreateCategory, setNewCategoryError, setNewCategorySucceed} = props;

    if(!createCategory) {
        return null
    }

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

    const resetAllStates = () => {
        setNewCategoryError(false);
        setNewCategorySucceed(false);
        setName('')
        setImage('');
        setCreateCategory(false)
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
                               onChange={handleFileSelected}
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