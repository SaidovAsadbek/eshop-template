import React, { useState } from "react";
import styles from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

// Messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Authentication to firebase
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

const logo = (
    <div className={styles.logo}>
        <NavLink to="/">
            <h2>
                e<span>Shop</span>.
            </h2>
        </NavLink>
    </div>
);

const cart = (
    <span className={styles.cart}>
        <NavLink to="/cart">
            Cart <FaShoppingCart size={20} /> <p>0</p>
        </NavLink>
    </span>
);

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => setShowMenu(!showMenu);

    const hideMenu = () => setShowMenu(false);

    const logoutUser = () => {
        signOut(auth)
            .then(() => {
                toast.success("Logout successfully...");
                navigate("/");
            })
            .catch((error) => toast.error(error.message));
    };

    return (
        <>
            <ToastContainer />
            <header>
                <div className={styles.header}>
                    {logo}
                    <nav
                        className={
                            showMenu
                                ? `${styles["show-nav"]}`
                                : `${styles["hide-menu"]}`
                        }>
                        <div
                            className={
                                showMenu
                                    ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                                    : `${styles["nav-wrapper"]}`
                            }
                            onClick={hideMenu}></div>
                        <ul onClick={hideMenu}>
                            <li className={styles["logo-mobile"]}>
                                {logo}
                                <FaTimes size={22} color="#fff" />
                            </li>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">Contact Us</NavLink>
                            </li>
                        </ul>
                        <div
                            className={styles["header-right"]}
                            onClick={hideMenu}>
                            <span className={styles.links}>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/register">Register</NavLink>
                                <NavLink to="/order-history">My Orders</NavLink>
                                <NavLink to="/" onClick={logoutUser}>
                                    Logout
                                </NavLink>
                            </span>
                            {cart}
                        </div>
                    </nav>
                    <div className={styles["menu-icon"]}>
                        {cart}
                        <HiOutlineMenuAlt3 onClick={toggleMenu} size={28} />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
