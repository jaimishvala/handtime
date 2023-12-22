import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from '../container/Home/Home';
import Product from '../container/Product/Product';
import About from '../container/About/About';
import Contact from '../container/Contact/Contact';
import Auth from '../container/Auth/Auth';
import Testimonial from '../container/Testimonial/Testimonial';
import Watch from '../container/Watch/Watch';
import { useContext } from 'react';
import ThemeContext from '../Context/theme.context';
import Cart from '../container/Cart/Cart';
import ReviewPage from '../container/Home/ReviewPage';

function UserRoute(props) {
    const theme = useContext(ThemeContext)
    console.log(theme);

    return (
        <>
            <div className={`${theme.theme}`}>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    {/* ReviewPage */}
                    <Route exact path='/ReviewPage/:id' element={<ReviewPage />} />
                    <Route exact path='/Watch' element={<Watch />} />
                    {/* addToCart */}
                    <Route exact path='/Cart' element={<Cart />} />

                    <Route exact path='/Product' element={<Product />} />
                    <Route exact path='/About' element={<About />} />
                    <Route exact path='/Contact' element={<Contact />} />
                    <Route exact path='/Testimonial' element={<Testimonial />} />
                    <Route exact path='/Auth' element={<Auth />} />
                </Routes>

                <Footer />
            </div>
        </>
    );
}

export default UserRoute;