import './_categoryPage.scss'
import {useParams} from "react-router-dom";
import {Container, FormControl, InputLabel, MenuItem, Select, Slider, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHook";
import {
    fetchCategoryProducts,
    onSearchFilter,
    sortByDropFilter, sortByPriceRange
} from "../../../redux/slices/productReducer";
import {useContext, useEffect, useState} from "react";
import ProductCard from "../HomePage/ProductCard/ProductCard";
import StoreServices from "../../StoreServices/StoreServices";
import ErrorImageComponent from "../../ErrorImageComponent/ErrorImageComponent";
import {ThemeContext} from "../../ThemeContext";
import {useDebounce} from "../../../hooks/useDebounce";
import {Store} from "react-notifications-component";

const NoProductsImage = require('../../../assets/img/categories/no-product.png')
const CategoryPage = () => {
    const {darkMode} = useContext(ThemeContext)
    const {category} = useParams();
    const dispatch = useAppDispatch();
    const productsState = useAppSelector(state => state.productReducer);
    const [admin, setAdmin] = useState(false);
    const service = new StoreServices();
    const user = useAppSelector(state => state.userReducer)
    //Filters
    const [maxPrice, setMaxPrice] = useState(500);
    const [value, setValue] = useState<number[]>([0, 10000]);
    const [dropFilter, setDropFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');
    const debouncedSearchFilter = useDebounce(searchFilter, 500);
    const debouncedRangeFilter = useDebounce(value, 500);

    //UPLOAD PRODUCTS FROM CATEGORY
    useEffect(() => {
        if(category) {
            dispatch(fetchCategoryProducts(category.charAt(category.length-1)));
        }
    }, [category]);

    // GET MAX PRICE FOR RANGE INPUT
    useEffect(() => {
        let max = 0;
        if(productsState && productsState.productsRef) {
            productsState.productsRef.map(item => {
                if(item.price > max) {
                    max = item.price
                }
                return item
            })
            setMaxPrice(max);
        }
    }, [productsState])

    //Check user Status
    useEffect(() => {
        if(user && user.role === 'admin') {
            setAdmin(true);
        }
        else {
            setAdmin(false)
        }
    }, [user])

    //Search delay with debounce hook logic to avoid API overload for search input text
    useEffect(() => {
            dispatch(onSearchFilter(searchFilter))
    }, [debouncedSearchFilter])

    //Search delay with debounce hook logic to avoid API overload for price range
    useEffect(() => {
        dispatch(sortByPriceRange(value));
    }, [debouncedRangeFilter])

    //Delete Item Logic for admins
    const deleteItem = (id:number) => {
        service.deleteProduct(id)
            .then(data => {
                if(category && data.status === 200) {
                    dispatch(fetchCategoryProducts(category.charAt(category.length-1)));
                } else {
                    Store.addNotification({
                        message: "Couldn't delete item, try again later",
                        type: "danger",
                        insert: "top",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 2000,
                            onScreen: true
                        }
                    })
                }
            })
            .then(() => Store.addNotification({
                title: "Item deleted successfully",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            }))
            .catch(()=> Store.addNotification({
                message: "Couldn't delete item, try again later",
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
    }

    return (
        <div  className={darkMode ? 'category_page category_page-dark' : 'category_page'}>
            <Container maxWidth='lg'>
                <h2>{category?.substring(0, category.length - 1)}</h2>
                <div className="category_page-filters">
                    <TextField style={{width: '300px'}}
                               id="outlined-basic"
                               label="Product"
                               variant="outlined"
                               size='small'
                               onChange={(e) => {
                                   setSearchFilter(e.target.value);
                               }}
                    />
                    <FormControl size='small'  style={{width: '220px'}}>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dropFilter}
                            label="Filter"
                            onChange={(e) => {
                                setDropFilter(e.target.value as string)
                                dispatch(sortByDropFilter(e.target.value as string))
                            }}
                        >
                            <MenuItem value={'default'}>Default</MenuItem>
                            <MenuItem value={'alphabet'}>A - Z</MenuItem>
                            <MenuItem value={'alphabet-desc'}>Z - A</MenuItem>
                            <MenuItem value={'price'}>Price to lowest</MenuItem>
                            <MenuItem value={'price-desc'}>Price to highest</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='category_page-filters-range'>
                        <Slider
                            getAriaLabel={() => 'Price range'}
                            value={value}
                            min={0}
                            max={maxPrice}
                            onChange={(e, data:any) => {
                                setValue(data)
                            }}
                            valueLabelDisplay="auto"
                            getAriaValueText={(value) => `${value}`}
                        />
                    </div>

                </div>
                { productsState.products && productsState.products.length > 0 ?
                    <div className="category_page-list">
                        {productsState.products.map(item => {
                            return (
                                <ProductCard
                                    admin={admin}
                                    deleteItem={deleteItem}
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    category={item.category}
                                    price={item.price}
                                    description={item.description}
                                    images={item.images}
                                />
                            )})}
                    </div>
                    : <ErrorImageComponent type='no-products' image={NoProductsImage}/>
                }
            </Container>
        </div>
    )
}

export default CategoryPage