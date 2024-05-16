"use client";
import classes from "./form.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { crudActions } from "@/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
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
    <div className={`container ${classes.main}`}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-4">
          <div className={classes.card}>
            <div className={`card-body ${classes["card-body"]}`}>
              <h4>Sign up</h4>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    name="name"
                  />
                  {formik.errors.name && (
                    <p className={classes.errTxt}>{formik.errors.name}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    name="email"
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
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password && (
                    <p className={classes.errTxt}>{formik.errors.password}</p>
                  )}
                </div>

                <button className="btn btn-primary w-100">Submit</button>
                <div className={classes.sperator}>OR</div>
                <p className={classes.link}>
                  Already have an account? <Link href="/">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
