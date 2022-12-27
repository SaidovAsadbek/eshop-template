import React, { useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import { NavLink, useNavigate } from "react-router-dom";

// Messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Authentication to firebase
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Loader Page
import Loader from "../../components/Loader/Loader";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();

        if (password === CPassword) {
            setIsLoading(true);

            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setIsLoading(false);

                    toast.success("Successfully registered...");
                    navigate("/");
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error(error.message);
                });
        } else {
            toast.error("Password or Email don't match");
        }
    };

    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Register</h2>
                        <form onSubmit={registerUser}>
                            <input
                                type="text"
                                value={email}
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={CPassword}
                                onChange={(e) => setCPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="--btn --btn-primary --btn-block">
                                Register
                            </button>
                        </form>
                        <span className={styles.register}>
                            <p>Already an account?</p>
                            <NavLink to="/login">Login</NavLink>
                        </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={registerImg} width="400" alt="Register" />
                </div>
            </section>
        </>
    );
};

export default Register;
