import './profile-functionality.scss'
import {Button} from "@mui/material";
import NewItemModal, {CategoryType} from "../../NewItemModal/NewItemModal";
import React, {useEffect, useState} from "react";
import StoreServices from "../../../../StoreServices/StoreServices";
import NotificationMessage from "../../../../NotificationMessage/NotificationMessage";

export interface ProfileFunctionalityProps{
    role: string,
}
const ProfileFunctionality = (props:ProfileFunctionalityProps) => {
    const [createProduct, setCreateProduct] = useState(false);
    const service = new StoreServices();
    const [categoriesError, setCategoriesError] = useState(false);
    const [newProductError, setNewProductError] = useState(false);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const {role} = props;

    useEffect(() => {
        service.getAllCategories()
            .then(setCategories)
            .catch(()=>setCategoriesError(true))
    }, [])


    return (
        <div className="profile-functionality">
            <h2>Store controls for {role}</h2>
            <div className="profile-functionality_btn-group">
                <Button variant="contained" onClick={()=> {
                    setNewProductError(false);
                    setCreateProduct(true)
                }}>Add New Item</Button>
            </div>
            <NewItemModal categories={categories} setCreateProduct={setCreateProduct} setNewProductError={setNewProductError} createProduct={createProduct}/>
            {categoriesError && <NotificationMessage message={`Couldn't upload categories, try again later`} type={'error'}/>}
            {newProductError && <NotificationMessage message={`Couldn't create new item, try again later`} type={'error'}/>}
        </div>)
}

export default ProfileFunctionality;