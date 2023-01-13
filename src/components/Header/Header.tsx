import './_header.scss'
import {Container} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHook";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import ThemeSwitchIcon from "./ThemeSwitchIcon";
import {ThemeContext} from "../ThemeContext";
import {fetchAllCategories} from "../../redux/slices/categoryReducer";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const WhiteLogoImage = require('../../assets/img/header/logo-white.png')
const BlackLogoImage = require('../../assets/img/header/logo-black.png')
const Header = () => {
    const {darkMode, toggleDarkMode} = useContext(ThemeContext)
    const categories = useAppSelector(state => state.categoriesReducer);
    const cart = useAppSelector(state => state.cartReducer);
    const [showCategories, setShowCategories] = useState(false);
    const navigate = useNavigate();
    const activeStyle = {
        textDecoration: "underline",
        color: 'orange',
        cursor: 'default'
    }
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(categories.length === 0) {
            dispatch(fetchAllCategories());
        }
    },[])

    //calculate cart total items
    const cartTotalItems = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.quantity;
        })
        return total
    }

    const navigateFromList = (value:string) => {
        console.log(value)
        navigate(`/categories/${value}`)
    }

    return (
        <>
            <div className={darkMode ? 'header header-dark' : 'header'}>
                <Container maxWidth='lg' className='header_wrap'>
                    <Link to={'/'}>
                        <div className='header_wrap-logo'>
                            <img src={darkMode ? WhiteLogoImage : BlackLogoImage} alt="logo"/>
                        </div>
                    </Link>
                    <div className='header_wrap-menu'>
                    <span className='header_wrap-menu_icon'>
                        <ThemeSwitchIcon checked={darkMode} onChange={() => toggleDarkMode()}/>
                    </span>
                    <span className='shopping-cart_anchor header_wrap-menu_icon'>
                        <div className={`cart-notification ${cart.length > 0 && 'cart-notification-enabled'}`}>{cartTotalItems()}</div>
                        <ShoppingCart/>
                    </span>
                    <span className='header_wrap-menu_icon'>
                        <Link to={'/account/'}><PersonIcon/></Link>
                    </span>
                    </div>
                </Container>
            </div>
            <div className={darkMode ? 'header-categories header-categories-dark' : 'header-categories'}>
                <Container maxWidth='lg'>
                    <ul className='header-categories_list'>
                        {categories.map((item, i )=> {
                            if(i < 4) {
                                return <NavLink
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    className='header-categories_list-item'
                                    key={item.id}
                                    to={`/categories/${item.name + item.id}`}>{item.name}</NavLink>
                            }
                        })}
                        {categories.length > 4 &&
                            <div className='header-categories_list-select '>
                                <button
                                        className={showCategories ? 'header-categories_list-item header-categories_list-select-btn show-more-categories_active-btn' : 'header-categories_list-item header-categories_list-select-btn'}
                                        onClick={()=> {
                                    setShowCategories(showCategories => !showCategories)
                                }}>More Categories
                                <KeyboardArrowDownIcon fontSize={"large"}/>
                                </button>
                                <div className={showCategories ? `header-categories_list-select-content show-more-categories_active` : `header-categories_list-select-content`}>
                                    {
                                        <ul className='header-categories_list-select-list'>
                                            {
                                            categories.map((item, i) => {
                                                if (i >= 4) {
                                                    return <NavLink
                                                    style={({ isActive }) =>
                                                    isActive ? activeStyle : undefined}
                                                onClick={() => setShowCategories(false)}
                                                className=''
                                                key={item.id}
                                                to={`/categories/${item.name + item.id}`}>{item.name}</NavLink>
                                            }
                                            })
                                            }
                                        </ul>
                                    }
                                </div>

                            </div>
                        }
                    </ul>
                </Container>
            </div>
        </>

    )
}

export default Header