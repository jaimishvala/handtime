import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getWatch } from '../../redux/slice/watch.slice';
import { useState } from 'react';

function WatchData() {
    const [filterData, setFilterData] = useState([])
    const dispatch = useDispatch();
    const watch = useSelector(state => state.watch);
    console.log(watch);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getWatch());
        const filteredWatch = watch.watch.filter((item) => item.sub_id === id);
        setFilterData(filteredWatch)

    }, [id]);

    // Filter the watch data based on the subcategory
    console.log(filterData);

    return (

        <div className='container'>
            <div className='row'>
                {filterData.map((item) => {
                    return (
                        <div key={item.id} className='watch col-lg-3'>
                            <NavLink to={"/Product/Details/" + item.id}>
                                <img src={item.file} width={"200px"} height={"200px"} />
                                <h4 style={{ color: 'black' }}>{item.name}</h4>
                                <p style={{ color: 'black' }}>{item.desc}</p>
                                <p style={{ color: 'black' }}>₹{item.price}</p>
                            </NavLink>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}

export default WatchData;
