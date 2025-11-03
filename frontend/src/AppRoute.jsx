import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomeRoute from "./pages/home/HomeRoute";
import AboutRoute from "./pages/about/AboutRoute";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";


const AppRoute = () => {

    function PrivateRoute({ children }) {
        const token = localStorage.getItem("access");
        alert('user login is required!')
        return token ? children : <Navigate to="/auth/login" />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeRoute />} />
                {/* <Route path="/about" element={<AboutRoute />} />  */}
                <Route path="/about" element={<PrivateRoute><AboutRoute /></PrivateRoute>} /> 
                {/* auth urls */}
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/login" element={<Login/>} />
                {/* <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoute;