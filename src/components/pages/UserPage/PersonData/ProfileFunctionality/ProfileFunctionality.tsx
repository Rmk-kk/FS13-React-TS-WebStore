import './profile-functionality.scss'
import {Button} from "@mui/material";
import NewItemModal, {CategoryType} from "../../NewItemModal/NewItemModal";
import {useState} from "react";
import StoreServices from "../../../../StoreServices/StoreServices";

export interface ProfileFunctionalityProps{
    role: string,
}
const ProfileFunctionality = (props:ProfileFunctionalityProps) => {
    const [createProduct, setCreateProduct] = useState(false);
    const service = new StoreServices();
    const [error, setError] = useState(false)

    const [categories, setCategories] = useState<CategoryType[]>([]);
    useState(() => {
        service.getAllCategories()
            .then(setCategories)
            .catch(()=>setError(true))
    })
    const {role} = props;
    return (
        <div className="profile-functionality">
            <h2>Store controls for {role}</h2>
            <div className="profile-functionality_btn-group">
                <Button variant="contained" onClick={()=>setCreateProduct(true)}>Add New Item</Button>
            </div>
            <NewItemModal categories={categories} setCreateProduct={setCreateProduct} createProduct={createProduct}/>
        </div>
    )
}

export default ProfileFunctionality;