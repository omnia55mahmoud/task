"use client";
import classes from "./form.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { crudActions } from "@/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Input from "../input";
import Wrapper from "./wrapper";
const SignUp = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values) => {
    const serializedState = localStorage.getItem("reduxState");
    let users = [];
    if (serializedState) {
      const storedState = JSON.parse(serializedState);
      users = storedState.crud.users;
    }
    const emailExists = users.some(user => user.email === values.email);
    if (emailExists) {
      // Handle existing email
      toast.error("Email already in use.");
    } else {
      const payload = {
        id: Math.random(),
        name: values.name,
        email: values.email,
        password: values.password,
        products: [],
      };
    dispatch(crudActions.userRegister(payload));
      formik.resetForm();
      toast.success("User Registered Successfully");
      push("/");
    
    }
   
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Wrapper title="Sign up">
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <Input
          label="name"
          type="text"
          id="name"
          placeholder="Enter your name"
          onchange={formik.handleChange}
          onblur={formik.handleBlur}
          value={formik.values.nam}
          name="name"
          error={formik.touched.name && formik.errors.name}
          errorClass={classes.errTxt}
        />
        <Input
          label="Email"
          type="text"
          id="email"
          placeholder="Enter your email"
          onchange={formik.handleChange}
          onblur={formik.handleBlur}
          value={formik.values.email}
          name="email"
          error={formik.touched.email && formik.errors.email}
          errorClass={classes.errTxt}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          onchange={formik.handleChange}
          onblur={formik.handleBlur}
          value={formik.values.password}
          name="password"
          error={formik.touched.password && formik.errors.password}
          errorClass={classes.errTxt}
        />

        <button
          className="btn btn-primary w-100"
          style={{ background: "#26B7CD", border: "none" }}
        >
          Submit
        </button>
        <div className={classes.sperator}>OR</div>
        <p className={classes.link}>
          Already have an account? <Link href="/">Login</Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default SignUp;
