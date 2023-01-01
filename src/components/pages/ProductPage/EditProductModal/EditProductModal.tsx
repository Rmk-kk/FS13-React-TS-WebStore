import './edit-product.scss'
import React, {FormEvent, useState} from 'react'
import ReactDOM from 'react-dom';
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Category} from "@mui/icons-material";
import StoreServices from "../../../StoreServices/StoreServices";
import {CategoryType} from "../../UserPage/NewItemModal/NewItemModal";

export interface EditProductModalProps {
    edit: boolean,
    setEdit:  React.Dispatch<React.SetStateAction<boolean>>,
    category: number,
    title: string,
    price: number,
    description: string,
    id: number,
}
const EditProductModal = (props:EditProductModalProps) => {
    const {edit, setEdit, title, price, description, id, category} = props;
    const [newName, setNewName] = useState(title);
    const [categoryId, setCategoryId] = useState<number>(category);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [newPrice, setNewPrice] = useState(price);
    const [newDesc, setNewDesc] = useState(description);
    const service = new StoreServices();

    useState(() => {
        service.getAllCategories()
            .then(setCategories)
    })

    if(!edit) {
        return null
    }

    const handleForm = (e:FormEvent) => {
        e.preventDefault()
        const category = categories.filter(item => item.id === categoryId);
        console.log(category[0])
        const data = {
            'title': newName,
            'price': newPrice,
            'description': newDesc,
            'category' : category[0],
        }
        service.updateProduct(id, data)
            .then(data => console.log(data))
            .then(() => setEdit(false))
            .catch(e => console.log(e))
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
                    <div className='edit-product_modal-buttons'>
                        <button className='login-form_btn' onClick={() => setEdit(false)}>Close</button>
                        <button type='submit' className='login-form_btn'>Edit Product</button>
                    </div>
                </Box>
            </div>
        </>,
        document.getElementById('modal-window')!
    )
}

export default EditProductModal