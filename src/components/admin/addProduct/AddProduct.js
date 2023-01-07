import React, { useState } from "react";
import Card from "../../Card/Card";
import styles from "./AddProduct.module.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../../Loader/Loader";

const categories = [
    { id: 1, name: "Laptops" },
    { id: 2, name: "Electrics" },
    { id: 3, name: "Fashion" },
    { id: 4, name: "Phones" },
];

const initialState = {
    name: "",
    imageUrl: "",
    desc: "",
    price: 0,
    brand: "",
    category: "",
};

const AddProduct = () => {
    const [product, setProduct] = useState({ ...initialState });

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // console.log(file);
        const storageRef = ref(storage, `eShop/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                toast.error(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProduct({ ...product, imageUrl: downloadURL });
                    toast.success("Image uploaded successfully");
                });
            }
        );
    };

    const addProduct = (e) => {
        e.preventDefault();
        console.log(product);

        setIsLoading(true);

        // Add product
        try {
            const docRef = addDoc(collection(db, "products"), {
                name: product.name,
                imageUrl: product.imageUrl,
                desc: product.desc,
                price: Number(product.price),
                brand: product.brand,
                category: product.category,
                createdAt: Timestamp.now().toDate(),
            });

            setIsLoading(false);
            setUploadProgress(0);
            setProduct({ ...initialState });

            toast.success("Product added successfully");
            navigate("/admin/all-products");
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.product}>
                <h1>Add New Product</h1>
                <Card cardClass={styles.card}>
                    <form onSubmit={addProduct}>
                        <label htmlFor="">
                            Product Name:
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                required
                                value={product.name}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </label>

                        <label htmlFor="">
                            Product Image:
                            <Card className={styles.group}>
                                {uploadProgress === 0 ? null : (
                                    <div className={styles.progress}>
                                        <div
                                            style={{
                                                width: `${uploadProgress}%`,
                                            }}
                                            className={styles["progress-bar"]}>
                                            {uploadProgress < 100
                                                ? `Uploading ${uploadProgress}%`
                                                : `Upload Complete ${uploadProgress}%`}
                                        </div>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    placeholder="Product Image"
                                    onChange={(e) => handleImageChange(e)}
                                />
                                {product.imageUrl === "" ? null : (
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        value={product.imageUrl}
                                        disabled
                                    />
                                )}
                            </Card>
                        </label>

                        <label htmlFor="">
                            Product Price:
                            <input
                                type="text"
                                name="price"
                                placeholder="Product Price"
                                required
                                value={product.price}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </label>

                        <label htmlFor="">
                            Product Category:
                            <select
                                name="category"
                                required
                                value={product.category}
                                onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled>
                                    Choose Products Category
                                </option>
                                {categories.map((cat, index) => {
                                    return (
                                        <option value={cat.name} key={cat.id}>
                                            {cat.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>

                        <label htmlFor="">
                            Product Company or Brand:
                            <input
                                type="text"
                                name="brand"
                                placeholder="Product Brand"
                                required
                                value={product.brand}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </label>

                        <label htmlFor="">
                            Product Description:
                            <textarea
                                required
                                name="desc"
                                value={product.desc}
                                onChange={(e) => handleInputChange(e)}
                                cols="30"
                                rows="10"></textarea>
                        </label>
                        <button type="submit" className="--btn --btn-primary">
                            Save Product
                        </button>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default AddProduct;
