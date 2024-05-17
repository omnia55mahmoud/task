import { useFormik } from "formik";
import * as Yup from "yup";
import classes from "./input.module.css";
const Input = ({label,type,placeholder,onchange,onblur,value,name, error, errorClass})=>{
    return(
        <div className={`mb-3 ${classes["input-wrapper"]}`}>
        <label htmlFor="name" className="form-label">
          {label}
        </label>
        <input
          type={type}
          className="form-control"
          id={name}
          placeholder={placeholder}
          onChange={onchange}
          onBlur={onblur}
          value={value}
          name={name}
        />
         {error && (
                <p className={errorClass}>{error}</p>
            )}
      </div>
    )
}
export default Input