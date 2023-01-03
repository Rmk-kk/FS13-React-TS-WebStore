import './products.scss'

import {Container, Pagination} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHook";
import ProductCard from "../ProductCard/ProductCard";
import {useEffect, useState} from "react";
import {fetchAllProducts} from "../../../../redux/slices/productReducer";
import StoreServices from "../../../StoreServices/StoreServices";

const ProductsSection = () => {
    const [page, setPage] = useState(1);
    const products = useAppSelector(state => state.productReducer);
    const [productsLength, setProductsLength] = useState(0);
    const dispatch = useAppDispatch();
    const service = new StoreServices();
    const [admin, setAdmin] = useState(false);

    const user = useState(() => {
        const data = localStorage.getItem('user');
        if(data) {
            return JSON.parse(data)
        }
        return  null
    })
    //getProductLength
    useEffect(() => {
        service.getAllProducts()
            .then(data => setProductsLength(data.length))
            .catch(e => console.log(e))
    }, [])
    //getItems
    useEffect(() => {
        dispatch(fetchAllProducts({offset: page * 12 - 12, limit: 12}));
    }, [page])


    //Check user status
    useEffect(() => {
        if(user[0] && user[0].role === 'admin') {
            setAdmin(true);
        }
        else {
            setAdmin(false)
        }
    }, [user])


    //Delete Logic
    const deleteItem = (id:number) => {
        service.deleteProduct(id)
            .then(data => {
                if(data.status === 200) {
                    dispatch(fetchAllProducts({offset: page * 12 - 12, limit: 12}));
                }
            })
            .catch(e => console.log(e))
    }

    //Change Page
    const handleChange = (event:any, page:number) => {
        setPage(page);
    };

    return (
        <section className='products'>
            <Container maxWidth='lg'>
                <h2>All our products</h2>
                <div  className='products-wrap'>
                    <ul className="products-wrap_list">
                        {products.map(item => {
                            return <ProductCard deleteItem={deleteItem}
                                                admin={admin}
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                category={item.category}
                                                price={item.price}
                                                description={item.description}
                                                images={item.images}/>
                        })}
                    </ul>
                </div>
                <Pagination style={{display: 'flex', justifyContent: 'center'}}
                            count={Math.ceil(productsLength/12)}
                            page={page}
                            variant="outlined"
                            onChange={handleChange}
                            shape="rounded"
                            size="large"/>
            </Container>
        </section>
    )
}

export default ProductsSection