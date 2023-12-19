import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatch } from '../../redux/slice/watch.slice';
import { getProduct } from '../../redux/slice/product.slice';
import { addCart } from '../../redux/slice/cart.slice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Watch(props) {
    const [isLoading, setIsLoading] = useState(true);

    const products = useSelector(state => state.products)
    console.log(products);

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        dispatch(getProduct())
    }, [])


    const handleCart = (id) => {
        console.log(id);
        dispatch(addCart({ id: id, qty: 1 }))
    }


    return (
        <div className='container'>
            <h5>Watch:</h5>
            <br></br><br></br>
            <div className='row'>
                {

                    isLoading ?
                        <Box className="loading" sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box> :
                        products.products.map((v) => {

                            return (
                                <div className='watch col-lg-3'>
                                    <h4>{v.name}</h4>
                                    <span>{v.price}</span>
                                    <br></br><br></br>
                                    <button className='btn_cart' onClick={() => handleCart(v.id)}>Add To Card</button>
                                </div>
                            )

                        })


                }
            </div>
        </div>
    );
}

export default Watch;