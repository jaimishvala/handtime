import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatch } from '../../redux/slice/watch.slice';
import { useParams } from 'react-router-dom';
import { addCart } from '../../redux/slice/cart.slice';

function Details(props) {

    const watch = useSelector(state => state.watch)


    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWatch())
    }, [id])

    const handleCart = (id) => {
        console.log(id);
        dispatch(addCart({ id: id, qty: 1 }))
    }


    return (
        <div className='container'>
            <div className='row'>
                {
                    watch.watch.map((v) => {
                        if (v.id === id) {
                            return (
                                <div className='watch col-lg-3'>
                                    <img src={v.file} width={"200px"} height={"200px"} alt={v.name} />
                                    <h4 style={{ color: 'gray' }}>{v.name}</h4>
                                    <p style={{ color: 'gray' }}>{v.desc}</p>
                                    <p style={{ color: 'gray' }}>₹{v.price}</p>
                                    <button className='btn_cart' onClick={() => handleCart(v.id)}>Add To Card</button>
                                </div>
                            )
                        }
                    })

                }
            </div>
        </div>
    );
}

export default Details;