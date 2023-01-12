import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {CategoryType} from "../../NewItemModal/NewItemModal";
import createDate from "../../../../StoreServices/createDateFunction";
import StoreServices from "../../../../StoreServices/StoreServices";
import {useEffect, useState} from "react";
import {ProductList} from "../../../../types-interfaces";
import {Store} from "react-notifications-component";

const CategoryColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 45 },
    {
        field: 'name',
        headerName: 'Category name',
        width: 150,
        editable: false,
    },
    {
        field: 'createdAt',
        headerName: 'Created at',
        width: 150,
        editable: false,
    },
    {
        field: 'updatedAt',
        headerName: 'Updated At',
        type: 'number',
        width: 110,
        editable: false,
    },
    {
        field: 'categoryImage',
        headerName: 'Image',
        sortable: false,
        width: 280,
    },
];
const UsersColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
        field: 'name',
        headerName: 'User name',
        width: 180,
        editable: false,
    },
    {
        field: 'email',
        headerName: 'User email',
        width: 200,
        editable: false,
    },
    {
        field: 'password',
        headerName: 'User password',
        width: 150,
        editable: false,
    },
    {
        field: 'role',
        headerName: 'User role',
        editable: false,
        width: 140,
    },
]
const ProductColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
        field: 'title',
        headerName: 'Product Title',
        width: 180,
        editable: false,
    },
    {
        field: 'description',
        headerName: 'Product description',
        width: 200,
        editable: false,
    },
    {
        field: 'price',
        headerName: 'Product price',
        type: 'number',
        width: 150,
        editable: false,
    },
    {
        field: 'category',
        headerName: 'Product category',
        editable: false,
        width: 140,
    },
]

export interface GridDataContentProps {
    type: string,
    categories: CategoryType[]
}
export interface UsersData {
    "id": number,
    "email": string,
    "password": string,
    "name": string,
    "role": string
}

const GridDataContent = (props:GridDataContentProps) => {
    const {type, categories} = props;
    const [users, setUsers] = useState<UsersData[] | []>([])
    const [products, setProducts] = useState<ProductList | []>([])
    const service = new StoreServices();

    useEffect(() => {
        if(type === 'users'){
            service.getAllUsers()
                .then(setUsers)
                .catch(() => Store.addNotification({
                    title: "Couldn't get users",
                    type: "danger",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 1500,
                        onScreen: true
                    }
                }))
        } else if(type === 'products') {
            service.getAllProducts()
                .then(setProducts)
                .catch(() => Store.addNotification({
                    title: "Couldn't get products",
                    type: "danger",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 1500,
                        onScreen: true
                    }
                }))
        }
    }, [type])

    let rows, currentCol;
    if(type === 'categories') {
        currentCol = CategoryColumns;
        rows = categories.map(category => {
            return {
                id: category.id,
                name: category.name,
                categoryImage: category.image,
                createdAt: createDate(new Date(category.creationAt)),
                updatedAt: createDate(new Date(category.updatedAt)),
            }
        })
    }
    else if(users && type === 'users') {
        currentCol = UsersColumns;
        rows = users.map(user => {
            return {
                "id": user.id,
                "email": user.email,
                "password": user.password,
                "name": user.name,
                "role": user.role
            }
        })
    }
    else {
        currentCol = ProductColumns;
        rows = products.map(product => {
            return {
                "id": product.id,
                "title": product.title,
                "price": product.price,
                "description": product.description,
                "category": product.category.name
            }
        })
    }

    return (
        <Box sx={{ height: type === 'products' ? 800 : 500, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={currentCol}
                pageSize={type === 'products' ? 30 : 8}
                rowsPerPageOptions={type === 'products' ? [30] : [8]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}

export default  GridDataContent