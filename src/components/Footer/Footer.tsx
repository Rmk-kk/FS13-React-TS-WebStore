import './footer.scss'
import {Container} from "@mui/material";
import React from "react";
const Footer = () => {
    const categories = ['All', 'Cloths','Shoes','Furniture','Electronics','Other'];

    const categoryListElement = categories.map(item => {
        return <li key={item}><a href="#">{item}</a></li>
    })
    return (
        <footer className='footer'>
            <Container  maxWidth='lg'>
                <div className='footer-wrap_links'>
                    <ul>
                        {categoryListElement}
                    </ul>
                </div>
                <p>© 2022 | Helsinki 21, 02341 Helsinki | placeholder@emal.fi | Roman Demianchuk for Integrify</p>
            </Container>
        </footer>
    )
}

export default Footer
