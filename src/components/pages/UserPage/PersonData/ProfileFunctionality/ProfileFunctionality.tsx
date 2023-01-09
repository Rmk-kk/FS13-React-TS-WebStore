import './_profile-functionality.scss'
import {Button} from "@mui/material";
import NewItemModal, {CategoryType} from "../../NewItemModal/NewItemModal";
import React, {useEffect, useState} from "react";
import StoreServices from "../../../../StoreServices/StoreServices";
import NotificationMessage from "../../../../NotificationMessage/NotificationMessage";
import GridDataContent from "../GridDataContent/GridDataContent";
import NewCategoryModal from "../../NewCategoryModal/NewCategoryModal";
import EditCategoryModal from "../../EditCategoryModal/EditCategoryModal";

export interface ProfileFunctionalityProps{
    role: string,
}

const ProfileFunctionality = (props:ProfileFunctionalityProps) => {
    const service = new StoreServices();
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [createProduct, setCreateProduct] = useState(false);
    const [createCategory, setCreateCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    //ERROR HANDLING
    const [categoriesError, setCategoriesError] = useState(false);
    //New Product
    const [newProductError, setNewProductError] = useState(false);
    const [newProductSucceed, setNewProductSucceed] = useState(false);
    //New Category
    const [newCategoryError, setNewCategoryError] = useState(false);
    const [newCategorySucceed, setNewCategorySucceed] = useState(false);
    //Edit Category
    const [editCategoryError, setEditCategoryError] = useState(false);
    const [editCategorySucceed, setEditCategorySucceed] = useState(false);
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
                    <>
                        <Button variant="contained" onClick={()=> {
                            setNewCategoryError(false);
                            setNewCategorySucceed(false);
                            setCreateCategory(true);
                        }}>Add New Category</Button>
                        <Button variant="contained" value='users' onClick={()=> {
                            setEditCategoryError(false);
                            setEditCategorySucceed(false);
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
                               setEditCategory={setEditCategory}
                               setEditCategoryError={setEditCategoryError}
                               setEditCategorySucceed={setEditCategorySucceed}/>
            <NewItemModal categories={categories}
                          setNewProductSucceed={setNewProductSucceed}
                          setCreateProduct={setCreateProduct}
                          setNewProductError={setNewProductError}
                          createProduct={createProduct}/>
            <NewCategoryModal
                        createCategory={createCategory}
                        setCreateCategory={setCreateCategory}
                        setNewCategorySucceed={setNewCategorySucceed}
                        setNewCategoryError={setNewCategoryError}
            />
            {categoriesError && <NotificationMessage message={`Couldn't upload categories, try again later`}  id={1} type={'error'}/>}
            {newProductError && <NotificationMessage message={`Couldn't create new item, try again later`}  id={2}  type={'error'}/>}
            {newProductSucceed && <NotificationMessage message={`Item was successfully created`} id={3}  type={'success'}/>}
            {newCategoryError && <NotificationMessage message={`Couldn't create new category, try again later`}  id={4}  type={'error'}/>}
            {newCategorySucceed && <NotificationMessage message={`New category was successfully created`} id={5}  type={'success'}/>}
            {editCategoryError && <NotificationMessage message={`Couldn't edit category, try again later`}  id={6}  type={'error'}/>}
            {editCategorySucceed && <NotificationMessage message={`Category was edited successfully`} id={7}  type={'success'}/>}
        </div>)
}

export default ProfileFunctionality;