import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import ProductsForm from './ProductsForm';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteProduct, updateProduct } from '../../../redux/action/product.action';
import { addProduct, getProduct } from '../../../redux/slice/product.slice';


function Products(props) {
    const [mdata, setMdata] = useState([])
    const [update, setUpdate] = useState(false)

    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    console.log(products);

    useEffect(() => {
        dispatch(getProduct())
    }, [])



    const handleFormSubmit = (data) => {
        let localData = JSON.parse(localStorage.getItem("products"));
        console.log(localData);

        let id = Math.floor(Math.random() * 1000);
        // console.log(id);

        if (localData) {
            if (update) {
                dispatch(updateProduct(data))
            } else {
                dispatch(addProduct(data))
            }
        } else {
            localStorage.setItem("products", JSON.stringify([{ id, ...data }]))
            // setMdata(localData)
        }

        setUpdate(false)
    }


    const handleDelet = (id) => {
        // console.log(id);
        dispatch(deleteProduct(id))
    }

    const handleEdit = (data) => {
        setUpdate(data)
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'date', headerName: 'Date', width: 130 },
        { field: 'message', headerName: 'Message', width: 130 },
        {
            field: "action",
            headerName: "Action",
            width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="delete" onClick={() => handleDelet(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>

                        <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </>
                )
            }
        }

    ];

    return (
        <div>
            <ProductsForm onHandleSubmit={handleFormSubmit} updateData={update} />
            <div sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={products.products}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>

        </div>
    );
}

export default Products;