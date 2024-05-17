import { useFormik } from "formik";
import * as Yup from "yup";
const Input = ({label,type,placeholder,onchange,onblur,value,name, error, errorClass})=>{
    return(
        <div className="mb-3">
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