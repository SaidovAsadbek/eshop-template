import React from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

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
    return (
        <header>
            <div className={styles.header}>
                {logo}
                <nav>
                    {/* hideShow Menu */}
                    <ul>
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
                    <div className={styles["header-right"]}>
                        <span className={styles.links}>
                            <NavLink to="/login">Login</NavLink>
                        </span>
                        <span className={styles.links}>
                            <NavLink to="/register">Register</NavLink>
                        </span>
                        <span className={styles.links}>
                            <NavLink to="/order-history">My Orders</NavLink>
                        </span>
                        {cart}
                    </div>
                </nav>
                <div className={styles["menu-icon"]}>
                    {cart}
                    <HiOutlineMenuAlt3 size={28} />
                </div>
            </div>
        </header>
    );
};

export default Header;
