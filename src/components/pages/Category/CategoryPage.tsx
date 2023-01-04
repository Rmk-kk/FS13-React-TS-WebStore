import './categoryPage.scss'

import {useParams} from "react-router-dom";
import {Container, FormControl, InputLabel, MenuItem, Select, Slider, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHook";
import {
    fetchCategoryProducts,
    onSearchFilter,
    sortByDropFilter, sortByPriceRange
} from "../../../redux/slices/productReducer";
import {useEffect, useState} from "react";
import ProductCard from "../HomePage/ProductCard/ProductCard";
import StoreServices from "../../StoreServices/StoreServices";
import ErrorImageComponent from "../../ErrorImageComponent/ErrorImageComponent";


const CategoryPage = () => {
    const {category} = useParams();
    const dispatch = useAppDispatch();
    const productsState = useAppSelector(state => state.productReducer);
    const [admin, setAdmin] = useState(false);
    const service = new StoreServices();
    const user = useState(() => {
        const data = localStorage.getItem('user');
        if(data) {
            return JSON.parse(data)
        }
        return  null
    })

    //Filters
    const [maxPrice, setMaxPrice] = useState(500);
    const [value, setValue] = useState<number[]>([0, 10000]);
    const[dropFilter, setDropFilter] = useState<string>('')

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
        if(user[0] && user[0].role === 'admin') {
            setAdmin(true);
        }
        else {
            setAdmin(false)
        }
    }, [user])

    //PRICE RANGE
    const handleRangeChange = (e:Event, data:number[]) => {
        dispatch(sortByPriceRange(data))
    }

    const getTextFromValue = (value:number) => {
        return `${value}`
    }


    //Delete Item Logic for admins
    const deleteItem = (id:number) => {
        service.deleteProduct(id)
            .then(data => {
                if(category && data.status === 200) {
                    dispatch(fetchCategoryProducts(category.charAt(category.length-1)));
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <Container maxWidth='lg' className='category_page'>
            <h2>{category?.substring(0, category.length - 1)}</h2>
            <div className="category_page-filters">
                <TextField style={{width: '300px'}}
                           id="outlined-basic"
                           label="Product"
                           variant="outlined"
                           size='small'
                           onChange={(e) => dispatch(onSearchFilter(e.target.value))}
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
                            handleRangeChange(e, data)
                        }}
                        valueLabelDisplay="auto"
                        getAriaValueText={(value) => getTextFromValue(value)}
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
                    : <ErrorImageComponent path='no-product'/>
            }
        </Container>
    )
}

export default CategoryPage