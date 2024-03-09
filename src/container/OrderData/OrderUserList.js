import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatch } from '../../redux/slice/watch.slice';
import { NavLink, createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { getOrder } from '../../redux/slice/order.slice';
import { DataGrid } from '@mui/x-data-grid';

function OrderUserList() {

    const order = useSelector(state => state.order)
    console.log(order.order);

    const watch = useSelector(state => state.watch);
    console.log(watch.watch);

    const location = useLocation();
    let params = new URLSearchParams(location.search);

    console.log(location, params.get('id'));

    const orderId = params.get('id');
    console.log(orderId);

    const dispatch = useDispatch()

    const finalData = order.order.filter((v) => v.id === orderId)
    console.log(finalData);

    useEffect(() => {
        dispatch(getOrder())
        dispatch(getWatch())
    }, [])

    return (
        <div>
            {
                <div className="container">
                    <div className="alert alert-info alert-dismissible fade show text-center mb-30"><span className="alert-close" data-dismiss="alert" /><i className="fe-icon-award" />&nbsp;&nbsp;With this purchase you will earn <strong>2,549</strong> Reward Points.</div>
                    {
                        finalData.map((v) => {
                            return (

                                <div className="cart-item d-md-flex justify-content-between">
                                    <div className="row"> 

                                        {v.product.map(v1 => {
                                            const matchingWatch = watch.watch.find(v2 => v1.product_id === v2.id);

                                            if (matchingWatch) {
                                                return (
                                                    <div key={v1.product_id} >
                                                        <NavLink to={"/Product/Details/" + v1.product_id}>
                                                            <img src={matchingWatch.file} alt={`Product ${v1.product_id}`} width={"300px"} height={"250px"} />
                                                            <h4>{matchingWatch.name}</h4>
                                                        </NavLink>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                    <div className="px-3 my-3 text-center">
                                        <div className="cart-item-label">Name</div><span className="text-xl font-weight-medium">{v.name}</span>
                                    </div>
                                    <div className="px-3 my-3 text-center">
                                        <div className="cart-item-label">Address</div><span className="text-xl font-weight-medium">{v.address1}</span>
                                    </div>
                                    <div className="px-3 my-3 text-center">
                                        <div className="cart-item-label">Quantity</div>
                                        {v.product.map((v2) => v2.qty)}
                                    </div>
                                    <div className="px-3 my-3 text-center">
                                        <div className="cart-item-label">Total Amount</div><span className="text-xl font-weight-medium">₹{v.total_amount}</span>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            }
        </div>
    );
}

export default OrderUserList;