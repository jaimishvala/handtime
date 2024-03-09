// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useParams } from 'react-router-dom';
// import { getOrder } from '../../redux/slice/order.slice';
// import { getWatch } from '../../redux/slice/watch.slice';

// function OrderDetail(props) {

//     const [filterData, setFilterData] = useState([]);
//     const dispatch = useDispatch();
//     const order = useSelector(state => state.order);
//     const watch = useSelector(state => state.watch);

//     const { orderID } = useParams();
//     console.log("orderID:", orderID);


//     useEffect(() => {
//         dispatch(getOrder());
//         dispatch(getWatch());
//         const filteredWatch = order.order.filter((v) => v.id === orderID);
//         setFilterData(filteredWatch);
//     }, [orderID]);

//     console.log(filterData);

//     return (
//         <div style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
//             <h2>Order Details</h2>
//             <div>
//             {
//                 filterData.map((v) => {
//                     return (
//                         <div>
//                             {v.product.map(v1 => {
//                                 const matchingWatch = watch.watch.find(v2 => v1.product_id === v2.id);

//                                 if (matchingWatch) {
//                                     return (
//                                         <div  className='orderDetail' key={v1.product_id} >
//                                             <img src={matchingWatch.file} alt={`Product ${v1.product_id}`} width={"300px"} height={"250px"} />
//                                             <h4>{matchingWatch.name}</h4>
//                                             <p style={{ color: "black" }}>{matchingWatch.desc}</p>
//                                             <p style={{ color: "black" }}>{v.state}</p>
//                                             <h6 style={{ color: "green" }}>₹{matchingWatch.price}</h6>
//                                         </div>
//                                     );
//                                 }
//                             })}
//                         </div>
//                     )
//                 })
//             }
//             </div>
//         </div>
//     );
// }

// export default OrderDetail;