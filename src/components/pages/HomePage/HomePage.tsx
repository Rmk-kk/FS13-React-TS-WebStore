import IntroSection from "./IntroSection/IntroSection";
import React from "react";
import Categories from "./ProductsSection/ProductsSection";
import Favourites from "./Favourites/Favourites";

const HomePage = () => {
    return (
        <>
            <IntroSection/>
            <Categories/>
            <Favourites/>
        </>
    )
}

export default HomePage