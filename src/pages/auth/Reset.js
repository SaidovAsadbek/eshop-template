import React from "react";
import Card from "../../components/Card/Card";
import styles from "./auth.module.scss";
import resetImg from "../../assets/forgot.png";
import { NavLink } from "react-router-dom";

const Reset = () => {
    return (
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={resetImg} width="400" alt="Register" />
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Reset Password</h2>
                    <form>
                        <input type="text" placeholder="Email" required />
                        <button className="--btn --btn-primary --btn-block">
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
    );
};

export default Reset;
