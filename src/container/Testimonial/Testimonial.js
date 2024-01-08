import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchCat } from '../../redux/slice/watchcat.slice';

function Testimonial(props) {

    const watchcat = useSelector(state => state.watchcat)
    console.log(watchcat);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWatchCat())
    }, [])

    return (
        <div className='container'>
            <section className="client_section layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Testimonial
                        </h2>
                    </div>
                    <br></br><br></br><br></br>
                    <div className='row'>
                        {
                            watchcat.watchcat.map((v) => {

                                return (
                                    <div className='watch col-lg-3'>
                                        <h4>{v.category_name}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <div id="customCarousel2" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-10 mx-auto">
                                        <div className="box">
                                            <div className="img-box">
                                                <img src="assets/images/client.jpg" alt />
                                            </div>
                                            <div className="detail-box">
                                                <div className="client_info">
                                                    <div className="client_name">
                                                        <h5>
                                                            Morojink
                                                        </h5>
                                                        <h6>
                                                            Customer
                                                        </h6>
                                                    </div>
                                                    <i className="fa fa-quote-left" aria-hidden="true" />
                                                </div>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                    labore
                                                    et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                                    cillum
                                                    dolore eu fugia
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-10 mx-auto">
                                        <div className="box">
                                            <div className="img-box">
                                                <img src="assets/images/client.jpg" alt />
                                            </div>
                                            <div className="detail-box">
                                                <div className="client_info">
                                                    <div className="client_name">
                                                        <h5>
                                                            Morojink
                                                        </h5>
                                                        <h6>
                                                            Customer
                                                        </h6>
                                                    </div>
                                                    <i className="fa fa-quote-left" aria-hidden="true" />
                                                </div>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                    labore
                                                    et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                                    cillum
                                                    dolore eu fugia
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-10 mx-auto">
                                        <div className="box">
                                            <div className="img-box">
                                                <img src="assets/images/client.jpg" alt />
                                            </div>
                                            <div className="detail-box">
                                                <div className="client_info">
                                                    <div className="client_name">
                                                        <h5>
                                                            Morojink
                                                        </h5>
                                                        <h6>
                                                            Customer
                                                        </h6>
                                                    </div>
                                                    <i className="fa fa-quote-left" aria-hidden="true" />
                                                </div>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                    labore
                                                    et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                                    cillum
                                                    dolore eu fugia
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ol className="carousel-indicators">
                        <li data-target="#customCarousel2" data-slide-to={0} className="active" />
                        <li data-target="#customCarousel2" data-slide-to={1} />
                        <li data-target="#customCarousel2" data-slide-to={2} />
                    </ol>
                </div>
            </section>
        </div>
    );
}

export default Testimonial;