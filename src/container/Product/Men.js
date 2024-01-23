import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatch } from '../../redux/slice/watch.slice';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Men(props) {

    const [men, setMen] = useState([])

    const watch = useSelector(state => state.watch)
    console.log(watch);

    const {id} = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWatch())

        const filterData = watch.watch.filter((v) => v.id === id)
        console.log(filterData);
        setMen(filterData)
    }, [id])

    console.log(men);


    return (
        <div>
            {
                men.map((v) => {
                    return (
                        <div key={v.id}>
                            <h2>{v.name}</h2>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Men;