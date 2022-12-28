import './header.scss'

import {Container} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import React from "react";
import {Link, NavLink} from "react-router-dom";
import {useAppSelector} from "../../hooks/reduxHook";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

const Header = () => {
    const categories = useAppSelector(state => state.categoriesReducer);

    const activeStyle = {
        textDecoration: "underline",
        color: 'orange',
        cursor: 'default'
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
                        <ShoppingCart/>
                    </span>
                    <span>
                        <PersonIcon/>
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