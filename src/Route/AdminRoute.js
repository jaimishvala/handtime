import React from 'react';
import Layout from '../Admin/componets/Layout';
import { Route, Routes } from 'react-router-dom';
import Products from '../Admin/container/Products/Products';
import SmartWatch from '../Admin/container/Watch/SmartWatch';
import WatchCat from '../Admin/container/WatchList/WatchCat';
import SubCategory from '../Admin/container/WatchList/SubCategory';
import PrivateRoute from './PrivateRoute';
import Order from '../Admin/container/Order/Order';
import OrderList from '../Admin/container/Order/OrderList';

function AdminRoute(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route exact element={<PrivateRoute />}>
                        <Route exact path='/Products' element={<Products />} />
                        <Route exact path='/SmartWatch' element={<SmartWatch />} />
                        <Route exact path='/WatchCat' element={<WatchCat />} />
                        <Route exact path='/SubCategory' element={<SubCategory />} />
                        <Route exact path='/Order' element={<Order />} />
                        <Route exact path='/OrderList' element={<OrderList />}/>
                    </Route>
                </Routes>
            </Layout>
        </>
    );
}

export default AdminRoute;