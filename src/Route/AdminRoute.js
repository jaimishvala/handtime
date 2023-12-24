import React from 'react';
import Layout from '../Admin/componets/Layout';
import { Route, Routes } from 'react-router-dom';
import Products from '../Admin/container/Products/Products';
import SmartWatch from '../Admin/container/Watch/SmartWatch';
import WatchCat from '../Admin/container/WatchList/WatchCat';
import SubCategory from '../Admin/container/WatchList/SubCategory';

function AdminRoute(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route exact path='/Products' element={<Products />} />
                    <Route exact path='/SmartWatch' element={<SmartWatch />} />
                    <Route exact path='/WatchCat' element={<WatchCat />} />
                    <Route exact path='/SubCategory' element={<SubCategory />}/>
                </Routes>
            </Layout>
        </>
    );
}

export default AdminRoute;