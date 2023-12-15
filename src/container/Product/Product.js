import React, { useEffect, useState } from 'react';
// import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';


function Product(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [productData, setProduct] = useState([])
    const [search, setSearch] = useState("")
    // const [filterData, setFilterData] = useState([])
    const [sort, setSort] = useState("")
    const [category, setCategory] = useState([])
    const [selectcat, setSelectCat] = useState("")

    const getProduct = async () => {
        // console.log("getProduct");

        let respones = await fetch("https://fakestoreapi.com/products")
        console.log(respones);

        let data = await respones.json();
        // console.log(data);

        let UniqeCat = [];

        data.map((v) => {
            if (!UniqeCat.includes(v.category)) {
                UniqeCat.push(v.category)
            }
        })

        console.log(UniqeCat);

        setCategory(UniqeCat)
        setProduct(data)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        getProduct()
    }, []);

    // console.log(search);

    const handlesearchsort = () => {
        console.log("ok", sort, selectcat);


        let fData = productData.filter((v) => {
            return (
                v.title.toLowerCase().includes(search.toLowerCase()) ||
                v.price.toString().includes(search.toString()) ||
                v.category.toLowerCase().includes(search.toLowerCase())
            )
        })
        // console.log(fData);

        if (selectcat !== '') {
            fData = fData.filter((d) => d.category === selectcat);
        }

        fData = fData.sort((a, b) => {
            if (sort === 'LowHigh') {
                return a.price - b.price;
            } else if (sort === 'HighLow') {
                return b.price - a.price;
            } else if (sort === 'az') {
                return a.title.localeCompare(b.title);
            } else if (sort === 'za') {
                return b.title.localeCompare(a.title);
            }
        })
        // console.log(fData);

        return fData
    }

    const handleButton = (id) => {
        console.log(id);
    }

    let finalData = handlesearchsort();
    // let finalData = filterData.length > 0 ? filterData : productData
    // console.log(finalData);
    return (
        <div>
            {
                isLoading ?
                    <Box className="loading" sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <>
                        <h1 style={{ color: "red" }}>Products:</h1>
                        <input onChange={(event) => setSearch(event.target.value)} placeholder='Search...' />

                        Sort By:
                        <select onChange={(event) => setSort(event.target.value)}>
                            <option value='0'>--Select--</option>
                            <option value='LowHigh'>Price(Low To High)</option>
                            <option value='HighLow'>Price(High To Low)</option>
                            <option value='az'>A To Z</option>
                            <option value='za'>Z To A</option>
                        </select>

                        <div>
                            {
                                category.map((v) => {
                                    return (
                                        <button style={{ backgroundColor: selectcat === v ? 'green' : '', border: "none", margin: "10px" }} onClick={() => { setSelectCat(v, !selectcat) }} >{v}</button>
                                    )
                                })
                            }
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px', justifyContent: 'space-between' }} className='row'>
                            {
                                finalData.map((v, i) => {
                                    return (
                                        <div className='Box' style={{ border: '1px solid black', width: '400px', marginTop: '10rem', padding: '20px' }}>
                                            <div className='image_box'>
                                                <img style={{ width: '300px', height: "300px" }} src={v.image} />
                                                <h2>{v.title}</h2>
                                                <h3>{v.category}</h3>
                                                <p>{v.price}</p>
                                                <button onClick={() => handleButton(v.id)}>Add To Cart</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
            }
        </div>
    );

}

export default Product;