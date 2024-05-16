"use client";
import { crudActions } from "@/store";
import classes from "./form.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

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
    <div className={`container ${classes.main}`}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-4">
          <div className={classes.card}>
            <div className={`card-body ${classes["card-body"]}`}>
              <h4>Sign in</h4>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && (
                    <p className={classes.errTxt}>{formik.errors.email}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                  />
                  {formik.errors.password && (
                    <p className={classes.errTxt}>{formik.errors.password}</p>
                  )}
                </div>

                <button className="btn btn-primary w-100">Submit</button>
                <div className={classes.sperator}>OR</div>
                <p className={classes.link}>
                  Don’t have account? <Link href="/signup">Signup</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
