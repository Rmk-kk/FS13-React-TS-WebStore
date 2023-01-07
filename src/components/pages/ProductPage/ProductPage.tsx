import './product-page.scss';

import {useNavigate, useParams} from "react-router-dom";
import {Container} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {Product, ProductItem} from "../../types-interfaces";
import StoreServices from "../../StoreServices/StoreServices";
import ProductImageSlider from "./ProductImageSlider";
import {useAppDispatch} from "../../../hooks/reduxHook";
import { addItem } from "../../../redux/slices/cartReducer";
import EditProductModal from "./EditProductModal/EditProductModal";
import {ThemeContext} from "../../ThemeContext";

const ProductPage = () => {
    const {id} = useParams();
    const {darkMode} = useContext(ThemeContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState(false);
    const [admin, setAdmin] = useState(false);
    const user = useState(() => {
        const data = localStorage.getItem('user');
        if(data) {
            return JSON.parse(data)
        }
        return  null
    })
    const service = new StoreServices();

    //Check user Status
    useEffect(() => {
        if(user[0] && user[0].role === 'admin') {
            setAdmin(true);
        }
        else {
            setAdmin(false)
        }
    }, [user])

    //Delete Item Logic for admins
    const deleteItem = (id:number) => {
        service.deleteProduct(id)
            .then(data => {
                if(data.status === 200) {
                    navigate('/');
                }
            })
            .catch(e => console.log(e))
    }

    const updateProduct = () => {
        if(!id) {
            return
        }
        service.fetchSingleProduct(id)
            .then(setProduct)
            .catch(() => setError(true))
    }

    useEffect(() => {
        updateProduct();
    }, [id])


    const content = (product) ? <View
                                     deleteItem={deleteItem}
                                     admin={admin}
                                     id={product.id}
                                     title={product.title}
                                     price={product.price}
                                     description={product.description}
                                     images={product.images}
                                     category={product.category} /> : null;
    return (
        <div className={darkMode ? 'singleProduct singleProduct-dark' : 'singleProduct'}>
            <Container maxWidth='lg'>
                <div className='singleProduct-wrap'>
                    {content}
                </div>
            </Container>
        </div>
    )
}

const View = (product:ProductItem) => {
    const {title, price, description, images, category, admin, deleteItem, id} = product;
    const item = {title, price, description, images, category, id}
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    // @ts-ignore
    return (
        <>
            <div className="singleProduct-wrap_images">
                <ProductImageSlider slides={images}/>
            </div>
            <div className="singleProduct-wrap_content">
                <h1>{title}</h1>
                <h3>{category.name}</h3>
                <p>{description}</p>
                <div className='singleProduct-wrap_content-price'>
                    <span>{price}$</span>
                    <button onClick={() => dispatch(addItem(item))}>
                        Add to Cart
                        &#128722;
                    </button>
                </div>
                {admin && (
                    <div className='singleProduct-wrap_content-admin'>
                        <button onClick={()=>setEdit(true)}>Edit</button>
                        <button onClick={() => deleteItem(id)}>Delete</button>
                    </div>
                )
                }
            </div>
            <EditProductModal edit={edit}
                              category={category.id}
                              setEdit={setEdit}
                              title={title}
                              id={id}
                              price={price}
                              description={description}
            />
        </>
    )
}

export default ProductPage