import './header.scss'

import {Container} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHook";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import {logout} from "../../redux/slices/userReducer";

const Header = () => {
    const categories = useAppSelector(state => state.categoriesReducer);
    const [name, setName] = useState(null);
    const cart = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();
    const user = useState(() => {
        const data = localStorage.getItem('user');
        if(data) {
            return JSON.parse(data)
        }
        return  null
    })
    useEffect(() => {
        if(user && user[0]) {
            setName(user[0].name)
        }
    }, [user])

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
                    <div style={{width : '150px'}}>
                        <input type="text" placeholder={'Search'} className='header_wrap-input'/>
                    </div>

                    <Link to={'/'}>
                        <div className='header_wrap-logo'>
                            <img src="../img/header/62b1a410aba6acdc8069cc3e_integrify-logo high.png" alt="logo"/>
                        </div>
                    </Link>
                    <div className='header_wrap-menu'>
                    <span>
                        <FavoriteIcon/>
                    </span>
                    <span className='shopping-cart_anchor'>
                        <div className={`cart-notification ${cart.length > 0 && 'cart-notification-enabled'}`}>{cartTotalItems()}</div>
                        <ShoppingCart/>
                    </span>
                    <span>
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