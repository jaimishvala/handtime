import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function ReviewPage(props) {

    const [review, setReview] = useState([])
    const { id } = useParams()


    const getData = async () => {
        let response = await fetch("https://jsonplaceholder.typicode.com/comments")
        console.log(response);

        let data = await response.json()
        console.log(data);

        let fdata = data.filter((v) => v.id == id)
        console.log(fdata);
        setReview(fdata[0])

    }

    useEffect(() => {

        getData()
    })

    return (
        <div>
            <br></br><br></br><br></br>
            <div className='container reviewPage'>
                <h2>Review Pages:</h2>
                <h3>{review.name}</h3>
                <h6>{review.body}</h6>
            </div>
            <br></br><br></br><br></br>
        </div>
    );
}

export default ReviewPage;