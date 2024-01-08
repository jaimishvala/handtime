import React, { useEffect, useState } from 'react';
// import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { getWatch } from '../../redux/slice/watch.slice';


function Product(props) {

    const watch = useSelector(state => state.watch)
    console.log(watch.watch);
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(getWatch())
    }, []);

    // console.log(search);


    return (
        <div className='container'>
            <br></br><br></br><br></br>
            <div className='row'>
                {
                    watch.watch.map((v) => {
                        return (
                            <div className='watch col-lg-3'>
                                <h4>{v.name}</h4>
                                <h4>{v.sub_name}</h4>
                                <p>${v.price}</p>
                            </div>
                        )
                    })
                }
            </div>
            <br></br><br></br>
        </div>
    );

}

export default Product;