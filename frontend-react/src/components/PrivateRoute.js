import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import isLogged from './isLogged'

function PrivateRoute() {
    return isLogged() ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute