import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect } from 'react';

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
        <div className='container'>
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
                                    <div className='swiper_card'>
                                        <h2>{v.name.substring(0, 10)}</h2>
                                        <span>{v.body.substring(0, 200)}</span>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </div>


            </Swiper>
        </div>
    );
}
