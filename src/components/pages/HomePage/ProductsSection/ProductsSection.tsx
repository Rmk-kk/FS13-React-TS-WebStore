import './products.scss'

import {Container, Pagination} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHook";
import ProductCard from "../../../ProductCard/ProductCard";
import {ChangeEvent, useEffect, useState} from "react";
import {fetchAllProducts} from "../../../../redux/slices/productReducer";


const ProductsSection = () => {
    const [page, setPage] = useState(1);
    const products = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(page === 1) {
            dispatch(fetchAllProducts({offset: 0, limit: 12}));
        } else {
            dispatch(fetchAllProducts({offset: page * 12 - 12, limit: 12}));
        }

    }, [page])

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
                            return <ProductCard key={item.id}
                                                title={item.title}
                                                category={item.category}
                                                price={item.price}
                                                description={item.description}
                                                images={item.images}
                            />
                        })}
                    </ul>
                </div>
                <Pagination style={{display: 'flex', justifyContent: 'center'}}
                            count={17}
                            page={page - 1}
                            variant="outlined"
                            onChange={handleChange}
                            shape="rounded"
                            size="large"/>
            </Container>
        </section>
    )
}

export default ProductsSection