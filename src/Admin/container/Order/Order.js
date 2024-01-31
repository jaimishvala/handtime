import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import OrderForm from './OrderForm';
import ViewListIcon from '@mui/icons-material/ViewList';
import { addOrder, deleteOrder, getOrder, updateOrder } from '../../../redux/slice/order.slice';

function Order(props) {
    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch()

    const order = useSelector(state => state.order)
    console.log(order.order);

    useEffect(() => {
        dispatch(getOrder())
    }, [])

    const handleFormSubmit = (data) => {
        console.log(data);
        if (update) {
            dispatch(updateOrder(data))
        } else {
            dispatch(addOrder(data))
        }

        setUpdate(false)
    }

    const handleDelet = (id) => {
        dispatch(deleteOrder(id))
    }

    const handleEdit = (data) => {
        setUpdate(data)
    }

    const handleView = () => {
        console.log("view");

        const data = order.order.map((v) => {
            console.log(v);
        })
    }



    const columns = [
        {
            field: 'product_id', headerName: 'Product Id', width: 200,
            renderCell: (params) => {
                console.log(params.row);

                return params.row.product.map((product) => product.product_id).join(', ');
            }
        },
        { field: 'total_amount', headerName: 'Total Amount', width: 200 },
        { field: 'uid', headerName: 'UID', width: 200 },
        {
            field: 'address', headerName: 'Address', width: 200,
            renderCell: (params) => {
                console.log(params.row);

                return order.order.map((v) => v.zip)
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 130,
            renderCell: (params) => {
                return (
                    <>

                        <IconButton aria-label="view" onClick={() => handleView(params.row)}>
                            <ViewListIcon />
                        </IconButton>

                        <IconButton aria-label="delete" onClick={() => handleDelet(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>

                        <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </>
                )
            },
        }

    ];
    return (
        <div>
            <OrderForm onHandleSubmit={handleFormSubmit} updateData={update} />
            <br></br>
            <div style={{ height: 400, width: '100%' }}>

                <DataGrid
                    rows={order.order}
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

export default Order;