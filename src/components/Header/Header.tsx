import './header.scss'

import {Container, TextField} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import React from "react";

const Header = () => {
    const categories = ['All', 'Clothes','Shoes','Furniture','Electronics','Other']
    return (
        <>
            <div className='header'>
                <Container maxWidth='lg' className='header_wrap'>
                    <div style={{width : '150px'}}>
                        <input type="text" placeholder={'Search'} className='header_wrap-input'/>
                    </div>

                    <div className='header_wrap-logo'>
                        <img src="../img/header/62b1a410aba6acdc8069cc3e_integrify-logo high.png" alt="logo"/>
                    </div>
                    <div className='header_wrap-menu'>
                    <span>
                        <FavoriteIcon/>

                    </span>
                        <span>
                        <ShoppingCartIcon/>

                    </span>
                        <span>
                        <PersonIcon/>

                    </span>
                    </div>
                </Container>
            </div>
            <div className="header-categories">
                <Container maxWidth='lg'>
                    <ul>
                        {categories.map(item => {
                            return <li key={item}>{item}</li>
                        })}
                    </ul>
                </Container>
            </div>
        </>

    )
}

export default Header