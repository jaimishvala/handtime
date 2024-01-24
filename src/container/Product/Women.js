import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatch } from '../../redux/slice/watch.slice';
import { getWatchCat } from '../../redux/slice/watchcat.slice';
import { NavLink } from 'react-router-dom';

function Women(props) {

    const dispatch = useDispatch()
    const watch = useSelector(state => state.watch)
    console.log(watch);

    const watchcat = useSelector(state => state.watchcat)
    console.log(watchcat);

    useEffect(() => {
        dispatch(getWatch())
        dispatch(getWatchCat())
    }, [])

    return (
        <div className='container row'>
            {
                watch.watch.map((v) => {
                    const womenCategory = watchcat.watchcat.find((v1) => v1.category_name === "WOMENS")
                    if (womenCategory && v.category_id === womenCategory.id) {
                        return (
                            // <NavLink to={'/WatchData/Product' + v.id}>
                            <div className='col-lg-3'>
                                <img src={v.file} style={{ width: "200px", height: "200px" }} />
                                <h4>{v.name}</h4>
                                <span>{v.price}</span>
                            </div>
                            // </NavLink>
                        )
                    }

                })
            }

        </div>
    );
}

export default Women;