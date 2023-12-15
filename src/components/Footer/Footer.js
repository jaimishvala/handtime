import React from 'react';

function Footer(props) {
    return (
        <div>

            <div>
                <section className="info_section layout_padding2">
                    <div className="container">
                        <div className="info_logo">
                            <h2>
                                HandTime
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="info_contact">
                                    <h5>
                                        About Shop
                                    </h5>
                                    <div>
                                        <div className="img-box">
                                            <img src="assets/images/location-white.png" width="18px" alt />
                                        </div>
                                        <p>
                                            30,Ranuja Dham Society Puna Gam,Road,Surat-395010
                                        </p>
                                    </div>
                                    <div>
                                        <div className="img-box">
                                            <img src="assets/images/telephone-white.png" width="12px" alt />
                                        </div>
                                        <p>
                                            +91 7265939795
                                        </p>
                                    </div>
                                    <div>
                                        <div className="img-box">
                                            <img src="assets/images/envelope-white.png" width="18px" alt />
                                        </div>
                                        <p>
                                            jaimishvala@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="info_info">
                                    <h5>
                                        Informations
                                    </h5>
                                    <p>
                                        ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="info_insta">
                                    <h5>
                                        Instagram
                                    </h5>
                                    <div className="insta_container">
                                        <div className="row m-0">
                                            <div className="col-4 px-0">
                                                <a href>
                                                    <div className="insta-box b-1">
                                                        <img src="assets/images/w1.png" alt />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="col-4 px-0">
                                                <a href>
                                                    <div className="insta-box b-1">
                                                        <img src="assets/images/w2.png" alt />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="col-4 px-0">
                                                <a href>
                                                    <div className="insta-box b-1">
                                                        <img src="assets/images/w3.png" alt />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="col-4 px-0">
                                                <a href>
                                                    <div className="insta-box b-1">
                                                        <img src="assets/images/w4.png" alt />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="col-4 px-0">
                                                <a href>
                                                    <div className="insta-box b-1">
                                                        <img src="assets/images/w5.png" alt />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="col-4 px-0">
                                                <a href>
                                                    <div className="insta-box b-1">
                                                        <img src="assets/images/w6.png" alt />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="info_form ">
                                    <h5>
                                        Newsletter
                                    </h5>
                                    <form action>
                                        <input type="email" placeholder="Enter your email" />
                                        <button>
                                            Subscribe
                                        </button>
                                    </form>
                                    <div className="social_box">
                                        <a href>
                                            <img src="assets/images/fb.png" alt />
                                        </a>
                                        <a href>
                                            <img src="assets/images/twitter.png" alt />
                                        </a>
                                        <a href>
                                            <img src="assets/images/linkedin.png" alt />
                                        </a>
                                        <a href>
                                            <img src="assets/images/youtube.png" alt />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="footer_section">
                    <div className="container">
                        <p>
                            © <span id="displayYear" /> All Rights Reserved By
                            <a href="https://html.design/">Free Html Templates</a>
                        </p>
                    </div>
                </section>
            </div>

        </div>
    );
}

export default Footer;