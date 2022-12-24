import React from "react";
import Card from "../../components/Card/Card";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { NavLink } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    return (
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImg} width="400" alt="Login" />
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form>
                        <input type="text" placeholder="Email" required />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <button className="--btn --btn-primary --btn-block">
                            Login
                        </button>
                        <div className={styles.links}>
                            <NavLink to="/reset">Reset Password</NavLink>
                        </div>
                        <p>-- or --</p>
                    </form>
                    <button className="--btn --btn-danger --btn-block">
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
    );
};

export default Login;
