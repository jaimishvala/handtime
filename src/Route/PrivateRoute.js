import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute(props) {
    let auth = useSelector(state => state.auth)

    return (
        <div>
            {auth.user ? <Outlet /> : <Navigate to="/Auth" replace />}
        </div>
    );
}

export default PrivateRoute;