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
    const [categories, setCategories] = useState<CategoryType[]>([]);

    //ERROR HANDLING
    const [categoriesError, setCategoriesError] = useState(false);
    const [newProductError, setNewProductError] = useState(false);
    const [newProductSucceed, setNewProductSucceed] = useState(false);

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
                    setNewProductSucceed(false);
                    setCreateProduct(true)
                }}>Add New Item</Button>
            </div>
            <NewItemModal categories={categories}
                          setNewProductSucceed={setNewProductSucceed}
                          setCreateProduct={setCreateProduct}
                          setNewProductError={setNewProductError}
                          createProduct={createProduct}/>
            {categoriesError && <NotificationMessage message={`Couldn't upload categories, try again later`} type={'error'}/>}
            {newProductError && <NotificationMessage message={`Couldn't create new item, try again later`} type={'error'}/>}
            {newProductSucceed && <NotificationMessage message={`Item was successfully created`} type={'success'}/>}
        </div>)
}

export default ProfileFunctionality;