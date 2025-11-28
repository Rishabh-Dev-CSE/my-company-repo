import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomeRoute from "./pages/home/HomeRoute";
import AboutRoute from "./pages/about/AboutRoute";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Sidebar from "./components/dashboard/Sidebar";
import DashboardRoute from "./components/dashboard/DashboardRoute";
import AdminPanelRoute from "./admin_dashbord/panel_design/AdminPanelRoute";


const AppRoute = () => {

    function PrivateRoute({ children }) {
        const token = localStorage.getItem("access");
        if (!token) {
            alert('user login is required!')
        }
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
                <Route path="/auth/login" element={<Login />} />
                <Route path="/restaurant/dashboard" element={<DashboardRoute />} />


                {/* ===============Admin Panel Routes ============ */}
                <Route path="/admin" element={<AdminPanelRoute />} />
                <Route path="/admin/controls" element={<AdminPanelRoute />} />
                <Route path="/admin/users" element={<AdminPanelRoute />} />
                <Route path="/admin/settings" element={<AdminPanelRoute />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoute;