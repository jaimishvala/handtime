import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ViewListIcon from '@mui/icons-material/ViewList';
import { addOrder, deleteOrder, getOrder, updateOrder } from '../../../redux/slice/order.slice';
import { useNavigate, createSearchParams } from "react-router-dom";

function Order(props) {
    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch()

    const order = useSelector(state => state.order)
    console.log(order.order);

    useEffect(() => {
        dispatch(getOrder())
    }, [])

    const columns = [
        {
            field: 'product_id', headerName: 'Product Id', width: 200,
            renderCell: (params) => {
                console.log(params.row);

                return params.row.product.map((product) => product.product_id).join(', ');
            }
        },
        { field: 'total_amount', headerName: 'Total Amount', width: 180 },
        { field: 'uid', headerName: 'UID', width: 200 },
        {
            field: 'address', headerName: 'Address', width: 600,
            renderCell: (params) => {

                console.log(params.row.product);

                return params.row.address1 + "," + params.row.city + "," + params.row.state + "," + params.row.country + "," + params.row.zip + "," + params.row.telephone;
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 180,

            renderCell: (params) => {
                return (
                    <ViewListIcon />
                )

            }
        }
    ];

    const navigate = useNavigate();

    const handleOnCellClick = (params) => {
        const currentRow = params.row;
        const options = {
            pathname: "/Admin/OrderList",
            search: `?${createSearchParams(currentRow)}`
        };
        navigate(options, { replace: true });
    };

    return (
        <div>

            <br></br>
            <div style={{ height: 400, width: '100%' }}>
                <h2>Order:</h2>
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
                    onCellClick={handleOnCellClick}
                />
            </div>
        </div>
    );
}

export default Order;