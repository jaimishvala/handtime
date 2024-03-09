import React, { useEffect, useState } from 'react';
// import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { getWatch } from '../../redux/slice/watch.slice';
import { getWatchCat } from '../../redux/slice/watchcat.slice';
import { NavLink } from 'react-router-dom';

function Product(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const watch = useSelector(state => state.watch)
    console.log(watch.watch);

    const watchcat = useSelector(state => state.watchcat)
    const dispatch = useDispatch()



    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        dispatch(getWatch())
        dispatch(getWatchCat())
    }, []);

    // console.log(search);


    return (
        <div>
            <br></br>

            <div className='row' style={{justifyContent:"center"}}>
                {
                    isLoading ?
                        <Box className="loading" sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                        :
                        watch.watch.map((v) => {
                            return (
                                <div className='watch col-lg-3'>
                                    <NavLink to={"/Product/Details/" + v.id}>

                                        <img src={v.file} width="200px" height="200px" />
                                        <h4 style={{color:"gray"}}>{v.name}</h4>
                                        <h6 style={{color:"gray"}}>₹{v.price}</h6>

                                    </NavLink>
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