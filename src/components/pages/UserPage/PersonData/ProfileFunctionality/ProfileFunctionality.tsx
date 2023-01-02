import './profile-functionality.scss'
import {Button} from "@mui/material";
import NewItemModal, {CategoryType} from "../../NewItemModal/NewItemModal";
import React, {useEffect, useState} from "react";
import StoreServices from "../../../../StoreServices/StoreServices";
import NotificationMessage from "../../../../NotificationMessage/NotificationMessage";
import GridDataContent from "../GridDataContent/GridDataContent";

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

    //DATA GRID

    const [show, setShow] = useState(false);
    const [type, setType] = useState<string>('categories')

    useEffect(() => {
        service.getAllCategories()
            .then(setCategories)
            .catch(()=>setCategoriesError(true))
    }, []);


    const handleDataButton = (e:React.MouseEvent<HTMLButtonElement>, value: string) => {
        if(show && type === value) {
            setShow(false);
        } else {
            setShow(true);
            setType(value);
        }
    }
    const {role} = props;

    return (
        <div className="profile-functionality">
            <h2>Store controls for {role}</h2>
            <div className="profile-functionality_btn-group">
                <Button variant="contained" onClick={()=> {
                    setNewProductError(false);
                    setNewProductSucceed(false);
                    setCreateProduct(true)
                }}>Add New product</Button>
                { role === 'admin' &&
                    <Button variant="contained" onClick={()=> {

                    }}>Add New Category</Button>

                }
                { role === 'admin' &&
                    <Button variant="contained" onClick={()=> {

                    }}>Check Store Data</Button>
                }
                { role === 'admin' &&
                    <Button variant="contained" value='categories' onClick={(e)=> {
                        handleDataButton(e, e.currentTarget.value)
                    }}>Check Categories</Button>
                }

                { role === 'admin' &&
                    <Button variant="contained" onClick={()=> {

                    }}>Check Users</Button>
                }
            </div>
            {show && <GridDataContent type={type} categories={categories}/>}

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