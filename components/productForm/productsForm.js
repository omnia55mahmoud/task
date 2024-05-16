"use client"

import { useSelector } from "react-redux";
import AddProduct from "./addproduct";
import UpdateProduct from "./updateProduct";

const ProductForm=()=>{
    const show = useSelector((state) => state.crud.showUpdateForm);

    return(
        <>
        {show ? <UpdateProduct /> : <AddProduct/>}
    </>
  
    )
}
export default ProductForm;