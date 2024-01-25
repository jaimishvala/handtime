import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatch } from '../../redux/slice/watch.slice';
import { NavLink } from 'react-router-dom';
import { getWatchCat } from '../../redux/slice/watchcat.slice';

function Men(props) {

    const watch = useSelector(state => state.watch)
    console.log(watch);

    const watchcat = useSelector(state => state.watchcat)
    console.log(watchcat);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWatch())
        dispatch(getWatchCat())
    }, [])



    return (
        <div className='container row'>
            {
                watch.watch.map((v) => {
                    const menCategory = watchcat.watchcat.find((v1) => v1.category_name === "MENS");
                    if (menCategory && v.category_id === menCategory.id) {
                        return (
                            <div className='watch col-lg-3'>
                                <NavLink to={'/Product/Details/' + v.id}>

                                    <img src={v.file} style={{ width: "200px", height: "200px" }} />
                                    <h3>{v.name}</h3>
                                    <span>₹{v.price}</span>

                                </NavLink>
                            </div>
                        )
                    }
                })
            }
        </div>
    );
}

export default Men;