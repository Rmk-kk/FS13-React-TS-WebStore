//PRODUCT AND PRODUCT LIST
import React from "react";

export type ProductList = Product[]
export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    images: string[],
    category: ProductListItemCategory
}
export interface ProductListItemCategory {
    id: number,
    name: string,
    image: string,
}

//CATEGORY AND CATEGORY ITEM

export type CategoryList = Category[]
export interface Category {
    id: number,
    name: string,
    image: string,
}

//PRODUCT ITEM

export interface ProductItem {
    deleteItem:(id: number) => void,
    admin?: boolean,
    id: number
    title: string,
    price: number,
    description: string,
    images: string[],
    category: ProductListItemCategory
}