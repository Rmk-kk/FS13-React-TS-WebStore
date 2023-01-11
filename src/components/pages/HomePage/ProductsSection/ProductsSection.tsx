import './_products.scss'
import {Container, Pagination} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHook";
import ProductCard from "../ProductCard/ProductCard";
import {useContext, useEffect, useState} from "react";
import {fetchAllProducts} from "../../../../redux/slices/productReducer";
import StoreServices from "../../../StoreServices/StoreServices";
import {ThemeContext} from "../../../ThemeContext";
import {Store} from "react-notifications-component";

const ProductsSection = () => {
    const {darkMode} = useContext(ThemeContext)
    const [page, setPage] = useState(1);
    const [productsLength, setProductsLength] = useState(0);
    const [admin, setAdmin] = useState(false);
    const user = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    const service = new StoreServices();
    const productsState = useAppSelector(state => state.productReducer);

    //getProductLength
    useEffect(() => {
        service.getAllProducts()
            .then(data => setProductsLength(data.length))
            .catch(() => Store.addNotification({
                title: "Some error occurred, reload the page",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1500,
                    onScreen: true
                }
            }))
    }, [])

    //getItems
    useEffect(() => {
        dispatch(fetchAllProducts({offset: page * 12 - 12, limit: 12}));
    }, [page])

    //Check user status
    useEffect(() => {
        if(user && user.role === 'admin') {
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
            .then(() => Store.addNotification({
                title: `Product was deleted`,
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1500,
                    onScreen: true
                }
            }))
            .catch(() => Store.addNotification({
                title: "Couldn't delete selected product",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1500,
                    onScreen: true
                }
            }))
    }

    //Change Page
    const handleChange = (event:any, page:number) => {
        setPage(page);
    };

    return (
        <section className={darkMode ? 'products products-dark' : 'products'}>
            <Container maxWidth='lg'>
                <h2>All our products</h2>
                <div  className='products-wrap'>
                    <ul className="products-wrap_list">
                        {productsState.products.map(item => {
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
                <Pagination className={darkMode ? 'products-pagination products-pagination-dark' : 'products-pagination'}
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