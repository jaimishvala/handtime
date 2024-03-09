import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Review(props) {
    const [review, setReview] = useState([])


    const getData = async () => {
        let response = await fetch('https://jsonplaceholder.typicode.com/comments')
        // console.log(response);

        let data = await response.json()
        // console.log(data);

        setReview(data)
    }

    useEffect(() => {
        getData()
    })

    return (
        <div>
            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                navigation={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                <div>
                    {
                        review.map((v) => {
                            return (
                                <SwiperSlide>
                                    <Link to={"/ReviewPage/" + v.id}>
                                        <div className='swiper_card'>
                                            <h2 style={{paddingTop:"30px"}}>{v.name.substring(0, 10)}</h2>
                                            <span>{v.body.substring(0, 150)}</span>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </div>


            </Swiper>
        </div>
    );
}
