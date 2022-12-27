import IntroSection from "./IntroSection/IntroSection";
import React from "react";
import Categories from "./ProductsSection/ProductsSection";
import Favourites from "./Favourites/Favourites";
import CategorySection from "./CategorySection/CategorySection";

const HomePage = () => {
    return (
        <>
            <IntroSection/>
            <Categories/>
            {/*<Favourites/>*/}
            <CategorySection/>
        </>
    )
}

export default HomePage