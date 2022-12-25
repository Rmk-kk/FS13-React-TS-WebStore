import React, {useState} from "react";
import {Container} from "@mui/material";

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);

    const elements = (!favourites.length) ? <h3> No elements yet</h3> : favourites.map(item => {
        return <li>favourite item</li>
    })
    return (
        <section className='categories'>
            <Container maxWidth='lg'>
                <h2>Your Favourites</h2>
                <div className='categories-wrap'>
                    <ul className="categories-wrap_list">
                        {elements}
                    </ul>
                </div>
            </Container>
        </section>
    )
}

export default Favourites;