import React from "react";
import styles from "./Admin.module.scss";
import {
    AddProduct,
    Home,
    Navbar,
    Orders,
    ViewProduct,
} from "../../components/admin";
import { Route, Routes } from "react-router-dom";

const Admin = () => {
    return (
        <div className={styles.admin}>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.content}>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/all-products" element={<ViewProduct />} />
                    <Route path="/add-products" element={<AddProduct />} />
                    <Route path="/view-orders" element={<Orders />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;
