import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

// Messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Authentication to firebase
import { auth } from "../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";

// store dispatch
import { useDispatch } from "react-redux";
import {
    SET_ACTIVE_USER,
    REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";

import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";

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
// home about contact
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [displayName, setDisplayName] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            // console.log(user);
            if (user) {
                if (user.displayName === null) {
                    const u1 = user.email.substring(0, user.email.indexOf("@"));
                    const uName = u1.charAt(0).toUpperCase() + u1.substring(1);
                    setDisplayName(uName);
                } else {
                    setDisplayName(user.displayName);
                }

                dispatch(
                    SET_ACTIVE_USER({
                        email: user.email,
                        username: user.displayName
                            ? user.displayName
                            : displayName,
                        userID: user.uid,
                    })
                );
            } else {
                setDisplayName("");
                dispatch(REMOVE_ACTIVE_USER());
            }
        });
    }, [dispatch, displayName]);

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
                                <NavLink className={activeLink} to="/">
                                    Home
                                </NavLink>
                            </li>
                            <ShowOnLogin>
                                <li>
                                    <NavLink
                                        className={activeLink}
                                        to="/contact">
                                        Contact Us
                                    </NavLink>
                                </li>
                            </ShowOnLogin>
                        </ul>
                        <div
                            className={styles["header-right"]}
                            onClick={hideMenu}>
                            <span className={`${styles.links} --align-center`}>
                                <ShowOnLogout>
                                    <NavLink className={activeLink} to="/login">
                                        Login
                                    </NavLink>
                                </ShowOnLogout>
                                <ShowOnLogin>
                                    <NavLink
                                        to="/"
                                        className={activeLink}
                                        style={{
                                            display: "flex",
                                            color: "#ff7722",
                                        }}>
                                        <FaUserCircle
                                            size={16}
                                            style={{ marginRight: "5px" }}
                                        />
                                        Hi, {displayName}
                                    </NavLink>
                                </ShowOnLogin>
                                <ShowOnLogout>
                                    <NavLink
                                        className={activeLink}
                                        to="/register">
                                        Register
                                    </NavLink>
                                </ShowOnLogout>
                                <ShowOnLogin>
                                    <NavLink
                                        className={activeLink}
                                        to="/order-history">
                                        My Orders
                                    </NavLink>
                                </ShowOnLogin>
                                <ShowOnLogin>
                                    <NavLink to="/" onClick={logoutUser}>
                                        Logout
                                    </NavLink>
                                </ShowOnLogin>
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
