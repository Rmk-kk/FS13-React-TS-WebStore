import IntroSection from "./IntroSection/IntroSection";
import React from "react";
import ProductsSection from "./ProductsSection/ProductsSection";
import CategorySection from "./CategorySection/CategorySection";

const HomePage = () => {
    return (
        <>
            <IntroSection/>
            <ProductsSection/>
            {/*<Favourites/>*/}
            <CategorySection/>
        </>
    )
}

export default HomePage