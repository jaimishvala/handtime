// import React from 'react';
// import ViewListIcon from '@mui/icons-material/ViewList';
// import { Link, createSearchParams, useNavigate } from 'react-router-dom';

// function OrderData({ result }) {
//     console.log(result);

//     const navigate = useNavigate();

//     const handleUser = (params) => {
//         const currentRow = params;
//         const options = {
//             pathname: "/OrderData/OrderUser",
//             search: `?${createSearchParams(currentRow)}`
//         };
//         navigate(options, { replace: true });
//     };

//     return (
//         <div style={{ padding: "30px" }}>
//             <h2>Order Data:</h2>
//             <div className='row'>
//                 {
//                     <div>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th scope="col">No.</th>
//                                     <th scope="col">UID</th>
//                                     <th scope="col">PID</th>
//                                     <th scope="col">Name</th>
//                                     <th scope="col">Address</th>
//                                     <th scope="col">Total Amount</th>
//                                     <th scope="col">Status</th>
//                                     <th scope="col">View</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     result.map((v, index) => {
//                                         return (
//                                             <>
//                                                 <tr key={index}>
//                                                     <td>{index + 1}.</td>
//                                                     <td>{v.uid}</td>
//                                                     <td>{v.product.map(v1 => v1.product_id).join(', ')}</td>
//                                                     <td>{v.name}</td>
//                                                     <td>{v.address1}</td>
//                                                     <td>₹{v.total_amount}</td>
//                                                     <td>{v.status}</td>
//                                                     <button onClick={(e) => handleUser(e.target.val)}>{<ViewListIcon />}</button>
//                                                 </tr>
//                                             </>
//                                         )
//                                     })
//                                 }
//                             </tbody>

//                         </table>
//                     </div>
//                 }
//                 <br></br><br></br><br></br>
//             </div>
//         </div>
//     );
// }

// export default OrderData;



import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate, createSearchParams } from "react-router-dom";
import { getOrder } from '../../redux/slice/order.slice';

function OrderData({ result }) {
    console.log(result);

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
            pathname: "/OrderData/OrderUser",
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
                    rows={result}
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
            <br></br><br></br><br></br>
        </div>
    );
}

export default OrderData;