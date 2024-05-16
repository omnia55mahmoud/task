"use client"
import classes from "./productsForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { crudActions } from "@/store";
import { useEffect } from "react";

const AddProduct = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.crud.products);
    const show = useSelector((state) => state.crud.showUpdateForm);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProductHandler = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        if (!data.name.trim() || !data.price.trim() || !data.quantity.trim()) {
            alert("Please fill in all fields."); // Inform the user to fill all fields
            return; // Prevent form submission
        }
        dispatch(crudActions.addProduct({
            id: Math.random(),  // random ID assignment
            name: data.name,
            price: data.price,
            quantity: data.quantity
        }));
        console.log(data);
    };

    return  (
        <div className={`container ${classes.formWrapper}`}>
            <div className="row">
                <form onSubmit={addProductHandler} className="d-flex justify-content-between align-items-center">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter your name"
                            name="name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            placeholder="Enter price"
                            name="price"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            placeholder="Enter quantity"
                            name="quantity"
                        />
                    </div>
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    ) 
}

export default AddProduct;
