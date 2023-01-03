import React from "react";
import { selectEmail } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
    const userEmail = useSelector(selectEmail);
    if (userEmail === "asadbeksaidov118@gmail.com") {
        return children;
    }
    return (
        <section style={{ height: "80vh" }}>
            <div className="container">
                <h2>Permission Denied.</h2>
                <p className="--mb">This page can only be view by an Admin user.</p>
                <hr className="--mb"/>
                <NavLink to="/">
                    <button className="--btn">&larr; Back to Home</button>
                </NavLink>
            </div>
        </section>
    );
};

export const AdminOnlyLink = ({ children }) => {
    const userEmail = useSelector(selectEmail);
    if (userEmail === "asadbeksaidov118@gmail.com") {
        return children;
    }
    return null;
};

export default AdminOnlyRoute;
