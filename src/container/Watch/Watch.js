import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatch } from '../../redux/slice/watch.slice';
import { getProduct } from '../../redux/slice/product.slice';
import { addCart } from '../../redux/slice/cart.slice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Watch(props) {
    const products = useSelector(state => state.products)
    console.log(products);

    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])



    const dispatch = useDispatch()

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        dispatch(getProduct())
    }, [])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             dispatch(getProduct());
    //         } catch (error) {
    //             console.error("Error fetching products:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [dispatch]);



    const handleSearch = (value) => {
        console.log(value, search);

        setSearch(value)

        let filteredData = products.products.filter((product) => {
            return (
                product.name.toLowerCase().includes(value.toLowerCase()) ||
                product.price.toString().includes(value.toLowerCase())
            );
        });

        console.log(filteredData);

        setFilterData(filteredData)
    }

    let finalData = filterData.length > 0 ? filterData : products
    console.log(finalData);


    const handleCart = (id) => {
        console.log(id);
        dispatch(addCart({ id: id, qty: 1 }))
    }


    return (
        <div className='container'>
            <h5>Watch:</h5>

            <input
                type='text'
                name='name'
                placeholder='Searching...'
                onChange={(event) => handleSearch(event.target.value)}
            />
            <br></br><br></br>
            <div className='row'>
                {

                    isLoading ?
                        <Box className="loading" sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box> :
                        finalData.map((v) => {

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