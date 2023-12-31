import React from 'react';
import Layout from '../Admin/componets/Layout';
import { Route, Routes } from 'react-router-dom';
import Products from '../Admin/container/Products/Products';
import SmartWatch from '../Admin/container/Watch/SmartWatch';

function AdminRoute(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route exact path='/Products' element={<Products />} />
                    <Route exact path='/SmartWatch' element={<SmartWatch />} />
                </Routes>
            </Layout>
        </>
    );
}

export default AdminRoute;