"use client"
import classess from "./productsForm.module.css"
import { useDispatch , useSelector } from "react-redux";
import { crudActions } from "@/store";
import { useEffect } from "react";
const UpdateProduct = ()=>{
    // const dispatch = useDispatch();
    // const products = useSelector((state) => state.crud.products);
   
  
  
       <div className={`container ${classess.formWrapper}`}>
      <div className="row">
       <form className="d-flex justify-content-between align-items-center">
       <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter your name"
          name="name"
          />
      </div>
      <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
          type="text"
          className="form-control"
          id="price"
          placeholder="Enter price"
          name="price"
          />
      </div>
      <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
          type="number"
          className="form-control"
          id="quantity"
          placeholder="Enter quantity"
          name="quantity"
          />
      </div>
      <button className="btn btn-primary">update</button>
       </form>
      </div>
     </div>
     
 
}
export default UpdateProduct;