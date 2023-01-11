import './_profile-functionality.scss'
import {Button} from "@mui/material";
import NewItemModal, {CategoryType} from "../../NewItemModal/NewItemModal";
import React, {useEffect, useState} from "react";
import StoreServices from "../../../../StoreServices/StoreServices";
import GridDataContent from "../GridDataContent/GridDataContent";
import NewCategoryModal from "../../NewCategoryModal/NewCategoryModal";
import EditCategoryModal from "../../EditCategoryModal/EditCategoryModal";
import {Store} from "react-notifications-component";
export interface ProfileFunctionalityProps{
    role: string,
}

const ProfileFunctionality = (props:ProfileFunctionalityProps) => {
    const service = new StoreServices();
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [createProduct, setCreateProduct] = useState(false);
    const [createCategory, setCreateCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(false);

    //DATA GRID
    const [show, setShow] = useState(false);
    const [type, setType] = useState<string>('categories')

    useEffect(() => {
        service.getAllCategories()
            .then(setCategories)
            .catch(()=>Store.addNotification({
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
                    setCreateProduct(true)
                }}>Add New product</Button>
                { role === 'admin' &&
                    <>
                        <Button variant="contained" onClick={()=> {
                            setCreateCategory(true);
                        }}>Add New Category</Button>
                        <Button variant="contained" value='users' onClick={()=> {
                            setEditCategory(true);
                        }}>Edit Category</Button>
                        <Button variant="contained" value='products' onClick={(e)=> {
                            handleDataButton(e, e.currentTarget.value)
                        }}>Check Products Data</Button>
                        <Button variant={"contained"} value='categories' onClick={(e)=> {
                            handleDataButton(e, e.currentTarget.value)
                        }}>Check Categories</Button>
                        <Button variant="contained" value='users' onClick={(e)=> {
                            handleDataButton(e, e.currentTarget.value)
                        }}>Check Users</Button>
                    </>
                }
            </div>
            {show && <GridDataContent type={type} categories={categories}/>}
            <EditCategoryModal editCategory={editCategory}
                               setEditCategory={setEditCategory}/>
            <NewItemModal categories={categories}
                          setCreateProduct={setCreateProduct}
                          createProduct={createProduct}/>
            <NewCategoryModal
                        createCategory={createCategory}
                        setCreateCategory={setCreateCategory}
            />
        </div>)
}

export default ProfileFunctionality;