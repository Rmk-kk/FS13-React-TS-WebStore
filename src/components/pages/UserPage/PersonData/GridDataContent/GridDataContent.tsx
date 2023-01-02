import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {CategoryType} from "../../NewItemModal/NewItemModal";
import createDate from "../../../../StoreServices/createDateFunction";

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

export interface GridDataContentProps {
    type: string,
    categories: CategoryType[]
}

const GridDataContent = (props:GridDataContentProps) => {
    const {type, categories} = props;
    let rows;
    if(type === 'categories') {
        rows = categories.map(category => {
            return {
                id: category.id,
                name: category.name,
                categoryImage: category.image,
                createdAt: createDate(new Date(category.creationAt)),
                updatedAt: createDate(new Date(category.updatedAt)),
            }
        })
    } else {
        rows = [
            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
            { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
            { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
            { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
            { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
            { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
            { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        ];
    }

    return (
        <Box sx={{ height: 550, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={CategoryColumns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}

export default  GridDataContent