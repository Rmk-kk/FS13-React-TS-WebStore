import './categoryPage.scss'

import {useParams} from "react-router-dom";
import {Container, FormControl, InputLabel, MenuItem, Select, Slider, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHook";
import {fetchCategoryProducts} from "../../../redux/slices/productReducer";
import {useEffect, useState} from "react";
import ProductCard from "../../ProductCard/ProductCard";
import {Product, ProductList} from "../../types-interfaces";


const CategoryPage = () => {
    const {category} = useParams();
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.productReducer);
    //Filters
    const [maxPrice, setMaxPrice] = useState(100);
    const [value, setValue] = useState<number[]>([0, 10000]);
    const[filterInput, setFilterInput] = useState('');
    const[dropFilter, setDropFilter] = useState<string>('')

    //UPLOAD PRODUCTS FROM CATEGORY
    useEffect(() => {
        if(category) {
            dispatch(fetchCategoryProducts(category.charAt(category.length-1)));
        }
    }, [category]);

    //GET MAX PRICE FOR RANGE INPUT
    useEffect(() => {
        let max = 0;
        products.map(item => {
            if(item.price > max) {
                max = item.price
            }
            return item
        })
        setMaxPrice(max);
    }, [products])

    //FILTERS LOGIC

    //PRICE RANGE
    const handleRangeChange = (e:Event, data:number[]) => {
        setValue(data);
        // dispatch(onPriceRangeFilter(data))
    }
    const getTextFromValue = (value:number) => {
        return `${value}`
    }

    //INPUT
    const onFilterList = (search:string, list:ProductList) => {
        if(search.length === 0) {
            return list
        }

        return list.filter(item => {
            return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
    }

    //DropFilter
    const onDropFilterChange = (state:string, array:ProductList) => {
        switch (state) {
            case 'alphabet': {
                return array.sort((a:Product,b:Product) => {
                    return a.title.localeCompare(b.title)
                })
            }
            case 'alphabet-desc': {
                return array.sort((a:Product,b:Product) => {
                    return b.title.localeCompare(a.title)
                })
            }
            case 'price': {
                return array.sort((a:Product,b:Product) => {
                    return a.price - b.price
                })
            }
            case 'price-desc': {
                return array.sort((a:Product,b:Product) => {
                    return b.price - a.price
                })
            }
            case 'default' : {
                return inputFilterProducts;
            }
            default:
                return array
        }
    }

    const [min, max] = value;
    //price range sort
    const priceFilterProducts = products.filter(item => {
        return (item.price >= min && item.price <= max)
    })
    //text field sort
    const inputFilterProducts = onFilterList(filterInput, priceFilterProducts);
    //dropdown sort
    const sortedArray = onDropFilterChange(dropFilter, inputFilterProducts)
    return (
        <Container maxWidth='lg' className='category_page'>
            <h2>{category?.substring(0, category.length - 1)}</h2>
            <div className="category_page-filters">
                <TextField style={{width: '300px'}}
                           id="outlined-basic"
                           label="Product"
                           variant="outlined"
                           size='small'
                           onChange={(e) => setFilterInput(e.target.value)}
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
                            onDropFilterChange(e.target.value as string, inputFilterProducts)
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
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        min={0}
                        max={maxPrice}
                        onChange={(e, data:any) => handleRangeChange(e, data)}
                        valueLabelDisplay="auto"
                        getAriaValueText={(value) => getTextFromValue(value)}
                    />
                </div>

            </div>

            <div className="category_page-list">
                {sortedArray.map(item => {
                    return (
                        <ProductCard
                                     key={item.id}
                                     id={item.id}
                                     title={item.title}
                                     category={item.category}
                                     price={item.price}
                                     description={item.description}
                                     images={item.images}
                        />
                    )
                })}
            </div>

        </Container>
    )
}

export default CategoryPage