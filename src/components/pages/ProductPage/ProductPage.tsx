import './product-page.scss';

import {useParams} from "react-router-dom";
import {Container} from "@mui/material";
import {useEffect, useState} from "react";

import {Product, ProductItem} from "../../types-interfaces";
import StoreServices from "../../StoreServices/StoreServices";
import ProductImageSlider from "./ProductImageSlider";

const ProductPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const serviceClass = new StoreServices();

    const updateProduct = () => {
        if(!id) {
            return
        }
        serviceClass.fetchSingleProduct(id)
            .then(setProduct)
            .catch(() => setError(true))
    }

    useEffect(() => {
        updateProduct();
    }, [id])


    // const product:ProductItem = useAppSelector(state => state.singleProductReducer)
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     if(id) {
    //         dispatch(fetchSingleProduct(id!));
    //     }
    // }, [])

    const content = (product) ? <View id={product.id}
                                     title={product.title}
                                     price={product.price}
                                     description={product.description}
                                     images={product.images}
                                     category={product.category} /> : null;
    return (
        <Container maxWidth='lg'>
            <div className='singleProduct-wrap'>
                {content}
            </div>
        </Container>
    )
}

const View = (product:ProductItem) => {
    const {title, price, description, images, category} = product;
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
                    <button>
                        Add to Cart
                        &#128722;
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductPage