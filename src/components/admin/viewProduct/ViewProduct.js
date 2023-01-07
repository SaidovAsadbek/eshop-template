import React, { useState, useEffect } from "react";
import styles from "./ViewProduct.module.scss";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../Loader/Loader";

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setIsLoading(true);

        try {
            const productsRef = collection(db, "products");
            const q = query(productsRef, orderBy("createdAt", "desc"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                // console.log(snapshot.docs)
                const allProducts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(allProducts);
                setIsLoading(false);
            });
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.table}>
                <h2>All Products</h2>
                {products.length === 0 ? (
                    <p>No Products Found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => {
                                const {
                                    id,
                                    name,
                                    imageUrl,
                                    desc,
                                    brand,
                                    category,
                                    price,
                                } = product;

                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={imageUrl}
                                                alt={name}
                                                style={{ width: "100px" }}
                                            />
                                        </td>
                                        <td>{name}</td>
                                        <td>{category}</td>
                                        <td>{`$${price}`}</td>
                                        <td>
                                            <NavLink to="/admin/add-products">
                                                <FaEdit
                                                    size={20}
                                                    color="green"
                                                />
                                            </NavLink>
                                            &nbsp;
                                            <FaTrashAlt size={18} color="red" />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default ViewProduct;
