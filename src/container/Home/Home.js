import React from 'react';
import Review from './Review';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { getWatch } from '../../redux/slice/watch.slice';


function Home(props) {
    const watchcat = useSelector(state => state.watchcat)
    const watch = useSelector(state => state.watch)

    console.log(watch.watch);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWatch())
    }, [])
    return (
        <div>
            <div className="hero_area">
                <img src="assets/images/slider-bg.jpg" alt />
            </div>

            <section className="service_section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-lg-3">
                            <div className="box ">
                                <div className="img-box">
                                    <img src="assets/images/feature-1.png" alt />
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Fast Delivery
                                    </h5>
                                    <p>
                                        variations of passages of Lorem Ipsum available
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="box ">
                                <div className="img-box">
                                    <img src="assets/images/feature-2.png" alt />
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Free Shiping
                                    </h5>
                                    <p>
                                        variations of passages of Lorem Ipsum available
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="box ">
                                <div className="img-box">
                                    <img src="assets/images/feature-3.png" alt />
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Best Quality
                                    </h5>
                                    <p>
                                        variations of passages of Lorem Ipsum available
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="box ">
                                <div className="img-box">
                                    <img src="assets/images/feature-4.png" alt />
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        24x7 Customer support
                                    </h5>
                                    <p>
                                        variations of passages of Lorem Ipsum available
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="about_section layout_padding">
                <div className="container-fluid">
                    <h2 style={{ backgroundColor: "#8019c8" }}>
                        About
                    </h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="img_container">
                                <div className="img-box b1">
                                    <img src="assets/images/a-1.jpg" alt />
                                </div>
                                <div className="img-box b2">
                                    <img src="assets/images/a-2.jpg" alt />
                                </div>  
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="detail-box">
                                <h2>
                                    About Our Shop
                                </h2>
                                <p>
                                    There are many variations of passages of Lorem Ipsum
                                    There are many variations of
                                    passages of Lorem Ipsum
                                </p>
                                <Link to="/About">
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='product_section '>
                <div className='product_space'>
                    <div className="product_heading" style={{ marginLeft: "10px" }}>
                        <h2>
                            Men's Watches
                        </h2>
                    </div>
                    <div className='row' style={{ justifyContent: "space-evenly" }}>
                        {
                            watch.watch.map((v) => {
                                const menCategory = watchcat.watchcat.find((v1) => v1.category_name === "MENS");
                                if (menCategory && v.category_id === menCategory.id) {
                                    return (
                                        <div className='watch col-lg-2'>
                                            <NavLink to={'/Product/Details/' + v.id}>

                                                <img src={v.file} style={{ width: "200px", height: "200px" }} />
                                                <h3 style={{ color: "gray" }}>{v.name}</h3>
                                                <span style={{ color: "gray" }}>₹{v.price}</span>

                                            </NavLink>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </section>


            <section className='product_section '>
                <div className='product_space'>
                    <div className="product_heading" style={{ marginLeft: "10px" }}>
                        <h2>
                            Women's Watches
                        </h2>
                    </div>
                    <div className='row' style={{ justifyContent: "space-evenly" }}>
                        {
                            watch.watch.map((v) => {
                                const menCategory = watchcat.watchcat.find((v1) => v1.category_name === "WOMENS");
                                if (menCategory && v.category_id === menCategory.id) {
                                    return (
                                        <div className='watch col-lg-2'>
                                            <NavLink to={'/Product/Details/' + v.id}>

                                                <img src={v.file} style={{ width: "200px", height: "200px" }} />
                                                <h3 style={{ color: "gray" }}>{v.name}</h3>
                                                <span style={{ color: "gray" }}>₹{v.price}</span>

                                            </NavLink>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </section>


            <section className='product_section'>
                <div className='product_space'>
                    <div className="product_heading" style={{ marginLeft: "10px" }}>
                        <h2>
                            Watches
                        </h2>
                    </div>
                    <div className='row' style={{ justifyContent: "space-evenly" }}>
                        {
                            watch.watch.map((v) => {
                                const menCategory = watchcat.watchcat.find((v1) => v1.category_name === "WATCHES");
                                if (menCategory && v.category_id === menCategory.id) {
                                    return (
                                        <div className='watch col-lg-2'>
                                            <NavLink to={'/Product/Details/' + v.id}>

                                                <img src={v.file} style={{ width: "200px", height: "200px" }} />
                                                <h3 style={{ color: "gray" }}>{v.name}</h3>
                                                <span style={{ color: "gray" }}>₹{v.price}</span>

                                            </NavLink>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </section>


            {/* <section className="product_section ">
                <div className="container">
                    <div className="product_heading">
                        <h2>
                            Feature Watches
                        </h2>
                    </div>
                    <div className="product_container">
                        <div className="box">
                            <div className="box-content">
                                <div className="img-box">
                                    <img src="assets/images/w4.png" alt />
                                </div>
                                <div className="detail-box">
                                    <div className="text">
                                        <h6>
                                            Men's Watch
                                        </h6>
                                        <h5>
                                            <span>$</span> 300
                                        </h5>
                                    </div>
                                    <div className="like">
                                        <h6>
                                            Like
                                        </h6>
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-box">
                                <a href>
                                    Add To Cart
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <div className="box-content">
                                <div className="img-box">
                                    <img src="assets/images/w5.png" alt />
                                </div>
                                <div className="detail-box">
                                    <div className="text">
                                        <h6>
                                            Men's Watch
                                        </h6>
                                        <h5>
                                            <span>$</span> 300
                                        </h5>
                                    </div>
                                    <div className="like">
                                        <h6>
                                            Like
                                        </h6>
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-box">
                                <a href>
                                    Add To Cart
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <div className="box-content">
                                <div className="img-box">
                                    <img src="assets/images/w6.png" alt />
                                </div>
                                <div className="detail-box">
                                    <div className="text">
                                        <h6>
                                            Men's Watch
                                        </h6>
                                        <h5>
                                            <span>$</span> 300
                                        </h5>
                                    </div>
                                    <div className="like">
                                        <h6>
                                            Like
                                        </h6>
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-box">
                                <a href>
                                    Add To Cart
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* <section className="product_section ">
                <div className="container">
                    <div className="product_heading">
                        <h2>
                            New Arrivals
                        </h2>
                    </div>
                    <div className="product_container">
                        <div className="box">
                            <div className="box-content">
                                <div className="img-box">
                                    <img src="assets/images/w7.png" alt />
                                </div>
                                <div className="detail-box">
                                    <div className="text">
                                        <h6>
                                            Men's Watch
                                        </h6>
                                        <h5>
                                            <span>$</span> 300
                                        </h5>
                                    </div>
                                    <div className="like">
                                        <h6>
                                            Like
                                        </h6>
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-box">
                                <a href>
                                    Add To Cart
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <div className="box-content">
                                <div className="img-box">
                                    <img src="assets/images/w8.png" alt />
                                </div>
                                <div className="detail-box">
                                    <div className="text">
                                        <h6>
                                            Men's Watch
                                        </h6>
                                        <h5>
                                            <span>$</span> 300
                                        </h5>
                                    </div>
                                    <div className="like">
                                        <h6>
                                            Like
                                        </h6>
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-box">
                                <a href>
                                    Add To Cart
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <div className="box-content">
                                <div className="img-box">
                                    <img src="assets/images/w9.png" alt />
                                </div>
                                <div className="detail-box">
                                    <div className="text">
                                        <h6>
                                            Men's Watch
                                        </h6>
                                        <h5>
                                            <span>$</span> 300
                                        </h5>
                                    </div>
                                    <div className="like">
                                        <h6>
                                            Like
                                        </h6>
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-box">
                                <a href>
                                    Add To Cart
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="client_section layout_padding-bottom">
                <div>
                    <div className="heading_container heading_center">
                        <h2 style={{ backgroundColor: "#8019c8", color: "white", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "20px", paddingRight: "20px" }}>
                            Testimonial
                        </h2>
                    </div>
                </div>

                <br></br><br></br>

                {/* <Review /> */}

                <div id="customCarousel2" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div>
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

export default Home;