import './footer.scss'
import {Container} from "@mui/material";
import React from "react";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../hooks/reduxHook";
const Footer = () => {
    const categories = useAppSelector(state => state.categoriesReducer);

    const activeStyle = {
        textDecoration: "underline",
        color: '#043E85'
    }


    return (
        <footer className='footer'>
            <Container  maxWidth='lg'>
                <div className='footer-wrap_links'>
                    <ul>
                        <NavLink to={'/'}
                                 style={({ isActive }) =>
                                     isActive ? activeStyle : undefined
                                 }
                        >Main Page</NavLink>
                        {
                            categories.map(item => {
                                return <NavLink to={`/category/${item.name + item.id}`}
                                                key={item.id}
                                                style={({ isActive }) =>
                                                    isActive ? activeStyle : undefined
                                                }>
                                    {item.name}
                                </NavLink>}
                        )}
                    </ul>
                </div>
                <p>© 2022 | Helsinki 21, 02341 Helsinki | placeholder@emal.fi | Roman Demianchuk for Integrify</p>
            </Container>
        </footer>
    )
}

export default Footer