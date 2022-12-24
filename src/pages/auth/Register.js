import React, { useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import { NavLink } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");

    const registerUser = (e) => {
        e.preventDefault();
        console.log(email, password, CPassword);
    };

    return (
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
    );
};

export default Register;
