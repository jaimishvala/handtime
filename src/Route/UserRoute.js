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
import PrivateRoute from './PrivateRoute';
import WatchData from '../container/Watch/WatchData';
import Men from '../container/Product/Men';
import Women from '../container/Product/Women';
import Watches from '../container/Product/Watches';
import Details from '../container/Product/Details';

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
                    <Route element={<PrivateRoute />}>
                        <Route exact path='/Product' element={<Product />} />
                        <Route exact path='/Product/Men' element={<Men />} />
                        <Route exact path='/Product/Women' element={<Women />} />
                        <Route exact path='/Product/Watches' element={<Watches />} />
                        <Route exact path='/Product/:id' element={<WatchData />} />
                        <Route exact path='/Product/Details/:id' element={<Details />} />

                        <Route exact path='/Watch' element={<Watch />} />
                    </Route>
                    {/* addToCart */}
                    <Route exact path='/Cart' element={<Cart />} />

                    {/* <Route exact path='/Product' element={<Product />} /> */}
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