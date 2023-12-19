import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatch } from '../../redux/slice/watch.slice';
import { getProduct } from '../../redux/slice/product.slice';
import { addCart } from '../../redux/slice/cart.slice';

function Watch(props) {

    const products = useSelector(state => state.products)
    console.log(products);

    const dispatch = useDispatch()

    useEffect(() => {
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

                    products.products.map((v) => {

                        return (
                            <div className='watch col-lg-3'>
                                <h4>{v.name}</h4>
                                <span>{v.price}</span>
                                <br></br><br></br>
                                <button onClick={() => handleCart(v.id)}>Add To Card</button>
                            </div>
                        )

                    })


                }
            </div>
        </div>
    );
}

export default Watch;