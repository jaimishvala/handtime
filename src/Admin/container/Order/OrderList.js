import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, updateOrder } from '../../../redux/slice/order.slice';
import { useLocation } from 'react-router-dom';
import { getWatch } from '../../../redux/slice/watch.slice';
import * as yup from 'yup';
import { useFormik } from 'formik';

export function OrderList(props) {
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

    let Orderschema = yup.object().shape({
        status: yup.string()
            .required("Please Select Status"),
    })

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue, setValues } = useFormik({
        initialValues: {
            status: ''
        },
        validationSchema: Orderschema,
        onSubmit: (values) => {
            console.log(values)

            const updatedFinalData = finalData.map((order) => {
                if (order.id === orderId) {
                    return { ...order, status: values.status };
                }
                return order;
            });

            console.log(updatedFinalData);

            if (orderId && values.status !== '0') {

                dispatch(updateOrder({ id: orderId, status: values.status }));
            }
        },
    });

    return (
        <div>
            <h2>Order List:</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <select
                            id="status"
                            name='status'
                            className="form-control"
                            style={{ width: "30%" }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.status}
                        >
                            <option value="0">--Select Option--</option>
                            <option value="Pending">Pending</option>
                            <option value="Complete">Complete</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Reject">Reject</option>
                        </select>
                        {errors.status && touched.status ? <span style={{ color: "red" }}>{errors.status}</span> : null}

                    </div>
                </div>

                <br></br><br></br>
                <div className='row'>
                    {
                        finalData.map((v) => {
                            return (
                                <div className='col-lg-4'>
                                    <div className='row'>


                                        <div className="card">
                                            {v.product.map(v1 => {
                                                const matchingWatch = watch.watch.find(v2 => v1.product_id === v2.id);

                                                if (matchingWatch) {
                                                    return (

                                                        <div key={v1.product_id} >
                                                            <img src={matchingWatch.file} alt={`Product ${v1.product_id}`} width={"300px"} height={"250px"} />
                                                        </div>
                                                    );
                                                }
                                            })}
                                            <div className="card-body">
                                                <h5>Name:{v.name}</h5>
                                                <h6>Address:{v.address1}</h6>
                                                <h6>City:{v.city}</h6>
                                                <h6>State:{v.state}</h6>
                                                <h6>Country:{v.country}</h6>
                                                <span>Total Price:₹{v.total_amount}</span>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
                <br></br>
                <button type="button" class="btn btn-outline-primary" style={{ color: "black", width: "100px" }} onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default OrderList;