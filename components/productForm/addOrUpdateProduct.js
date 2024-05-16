"use client";
import classes from "./productsForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { crudActions } from "@/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

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
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-danger">{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Enter price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price ? (
              <p className="text-danger">{formik.errors.price}</p>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              placeholder="Enter quantity"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <p className="text-danger">{formik.errors.quantity}</p>
            ) : null}
          </div>
          <button className="btn btn-primary">
            {editProduct ? "Edite" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateProduct;
