"use client";
import classes from "./productsForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { crudActions } from "@/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import Input from "../input";

const AddOrUpdateProduct = () => {
  const dispatch = useDispatch();
  const { editProduct } = useSelector((state) => state.crud);
  const handleEdite = async (values) => {
    const payload = {
      id: editProduct.id,
      name: values.name,
      price: values.price,
      quantity: values.quantity,
    };
    dispatch(crudActions.updateProduct(payload));
    formik.resetForm();
  };
  const handleSave = (values) => {
    const payload = {
      id: Math.random(),
      name: values.name,
      price: values.price,
      quantity: values.quantity,
    };
    dispatch(crudActions.addProduct(payload));
  };
  const handleSubmite = (values) => {
    if (editProduct) {
      handleEdite(values);
      formik.resetForm();
    } else {
      handleSave(values);
    }
    formik.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    quantity: Yup.number().required("Quantity is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
    },
    onSubmit: handleSubmite,
    validationSchema,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
  });
  const handleInitialValues = () => {
    if (editProduct) {
      formik.setValues({
        name: editProduct.name,
        price: editProduct.price,
        quantity: editProduct.quantity,
      });
    }
  };
  useEffect(() => {
    handleInitialValues();
  }, [editProduct]);
  return (
    <div className={`container ${classes.formWrapper}`}>
      <div className="row">
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex justify-content-between align-items-center">
               <Input
                  label="Name"
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  onchange={formik.handleChange}
                  onblur={formik.handleBlur}
                  value={formik.values.name}
                  name="name"
                  error={formik.touched.name && formik.errors.name}
                  errorClass="text-danger"
                />
                 <Input
                  label="Price"
                  type="number"
                  id="price"
                  placeholder="Enter price"
                  onchange={formik.handleChange}
                  onblur={formik.handleBlur}
                  value={formik.values.price}
                  name="price"
                  error={formik.touched.price && formik.errors.price}
                  errorClass="text-danger"
                />
      
               <Input
                  label="Quantity"
                  type="number"
                  id="quantity"
                  placeholder="Enter quantity"
                  onchange={formik.handleChange}
                  onblur={formik.handleBlur}
                  value={formik.values.quantity}
                  name="quantity"
                  error={formik.touched.quantity && formik.errors.quantity}
                  errorClass="text-danger"
                />
         
          <button className="btn btn-primary">
            {editProduct ? "Edite" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateProduct;
