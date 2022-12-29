import React, { useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./auth.module.scss";
import resetImg from "../../assets/forgot.png";
import { NavLink, useNavigate } from "react-router-dom";

// Messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Authentication to firebase
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

// Loader Page
import Loader from "../../components/Loader/Loader";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const resetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false);
                toast.success(
                    "Check your email for the password reset link..."
                );
                navigate("/login");
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    };

    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={resetImg} width="400" alt="Register" />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Reset Password</h2>
                        <form onSubmit={resetPassword}>
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="--btn --btn-primary --btn-block">
                                Reset Password
                            </button>
                            <span className={styles.links}>
                                <p>
                                    <NavLink to="/login">- Login</NavLink>
                                </p>
                                <p>
                                    <NavLink to="/register">Register -</NavLink>
                                </p>
                            </span>
                        </form>
                    </div>
                </Card>
            </section>
        </>
    );
};

export default Reset;
