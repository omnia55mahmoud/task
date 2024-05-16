"use client";

import { useSelector } from "react-redux";
import AddOrUpdateProduct from "./addOrUpdateProduct";

const ProductForm = () => {
  const show = useSelector((state) => state.crud.showUpdateForm);

  return (
    <>
      <AddOrUpdateProduct />
    </>
  );
};
export default ProductForm;
