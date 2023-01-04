import './header.scss'

import {Container} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {useAppSelector} from "../../hooks/reduxHook";
import ShoppingCart from "../ShoppingCart/ShoppingCart";


const Header = () => {
    const categories = useAppSelector(state => state.categoriesReducer);
    const cart = useAppSelector(state => state.cartReducer);

    const activeStyle = {
        textDecoration: "underline",
        color: 'orange',
        cursor: 'default'
    }


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
            <div className='header'>
                <Container maxWidth='lg' className='header_wrap'>
                    <Link to={'/'}>
                        <div className='header_wrap-logo'>
                            <img src="../img/header/62b1a410aba6acdc8069cc3e_integrify-logo high.png" alt="logo"/>
                        </div>
                    </Link>
                    <div className='header_wrap-menu'>
                    <span className='header_wrap-menu_icon'>
                        <FavoriteIcon/>
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
            <div className="header-categories">
                <Container maxWidth='lg'>
                    <ul className='header-categories_list'>
                        {categories.map(item => {
                            return <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                className='header-categories_list-item'
                                key={item.id}
                                to={`/category/${item.name + item.id}`}>{item.name}</NavLink>
                        })}
                    </ul>
                </Container>
            </div>
        </>

    )
}

export default Header