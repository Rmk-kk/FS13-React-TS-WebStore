import './_header.scss'
import {Container} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHook";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import ThemeSwitchIcon from "./ThemeSwitchIcon";
import {ThemeContext} from "../ThemeContext";
import {fetchAllCategories} from "../../redux/slices/categoryReducer";


const WhiteLogoImage = require('../../assets/img/header/logo-white.png')
const BlackLogoImage = require('../../assets/img/header/logo-black.png')

const Header = () => {
    const {darkMode, toggleDarkMode} = useContext(ThemeContext)
    const categories = useAppSelector(state => state.categoriesReducer);
    const cart = useAppSelector(state => state.cartReducer);
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
                        <ThemeSwitchIcon onChange={() => toggleDarkMode()}/>
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
                        {categories.map(item => {
                            return <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                className='header-categories_list-item'
                                key={item.id}
                                to={`/categories/${item.name + item.id}`}>{item.name}</NavLink>
                        })}
                    </ul>
                </Container>
            </div>
        </>

    )
}

export default Header