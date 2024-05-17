"use client";
import { crudActions } from "@/store";
import classes from "./form.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Input from "../input";
import Wrapper from "./wrapper";

const Login = () => {
  const { push } = useRouter();
  const users = useSelector((state) => state.crud.users);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const user = users.find((user) => user.email === values.email);
      if (user) {
        if (values.password !== user.password) {
          formik.setErrors({
            password: "password is incorrect",
          });
          return;
        }
        dispatch(
          crudActions.userLogin({
            email: values.email,
            password: values.password,
          })
        );
        push("/dashboard");
      } else {
        formik.setErrors({
          email: "Email not found",
        });
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <Wrapper title="Sign in">
      <form onSubmit={formik.handleSubmit}>
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
          Don’t have account? <Link href="/signup">Signup</Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;
