import React, { useState, useEffect } from "react";
import styles from "./ViewProduct.module.scss";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../Loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";

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

    const confirmDelete = (id, imageUrl) => {
        Notiflix.Confirm.show(
            "Delete Product",
            "You are about to delete this product",
            "Delete",
            "Cancel",
            function okCb() {
                deleteProduct(id, imageUrl);
            },
            function cancelCb() {
                console.log("Cancelled");
            },
            {
                width: "320px",
                borderRadius: "8px",
                cssAnimationStyle: "zoom",
                // etc...
            }
        );
    };

    const deleteProduct = async (id, imageUrl) => {
        try {
            await deleteDoc(doc(db, "products", id));

            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);
            toast.success("Product deleted Successfully");
        } catch (error) {
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
                                            <FaTrashAlt
                                                onClick={() =>
                                                    confirmDelete(id, imageUrl)
                                                }
                                                size={18}
                                                color="red"
                                            />
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
