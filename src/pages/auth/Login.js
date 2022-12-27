import React, { useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

// Messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Authentication to firebase
import { auth } from "../../firebase/config";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

// Loader Page
import Loader from "../../components/Loader/Loader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();

        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setIsLoading(false);
                toast.success("Login successful...");
                navigate("/");
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    };

    const provider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                toast.success("Login successful");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={loginImg} width="400" alt="Login" />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Login</h2>
                        <form onSubmit={loginUser}>
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="--btn --btn-primary --btn-block">
                                Login
                            </button>
                            <div className={styles.links}>
                                <NavLink to="/reset">Reset Password</NavLink>
                            </div>
                            <p>-- or --</p>
                        </form>
                        <button
                            onClick={loginWithGoogle}
                            className="--btn --btn-danger --btn-block">
                            <FaGoogle
                                color="#fff"
                                style={{ marginRight: "10px" }}
                            />
                            Login With Google
                        </button>
                        <span className={styles.register}>
                            <p>Don't have and account?</p>
                            <NavLink to="/register">Register</NavLink>
                        </span>
                    </div>
                </Card>
            </section>
        </>
    );
};

export default Login;
