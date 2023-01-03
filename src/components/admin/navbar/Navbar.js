import React from "react";
import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { selectUsername } from "../../../redux/slice/authSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
    const username = useSelector(selectUsername);
    // console.log(username);

    return (
        <div className={styles.navbar}>
            <div className={styles.user}>
                <FaUserCircle size={40} color="white" />
                <h4 className="--mt">{username}</h4>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/admin/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/all-products">All Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/add-products">Add Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/view-orders">All Orders</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
