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
                            // <NavLink to={'/WatchData/Product' + v.id}>
                            <div className='col-lg-3'>
                                <img src={v.file} style={{ width: "200px", height: "200px" }} />
                                <h3>{v.name}</h3>
                                <span>₹{v.price}</span>
                            </div>
                            // </NavLink>
                        )
                    }
                })
            }
        </div>
    );
}

export default Men;