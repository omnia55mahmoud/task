"use client"
import store from "@/store";
import classes from "./table.module.css";
import {  useSelector ,useDispatch} from "react-redux";
import { crudActions } from "@/store";
const Table = () =>{
  const products = useSelector((state) => state.crud.products);
  const dispatch = useDispatch();
  const display=()=>{
      dispatch(crudActions.displayUpdateForm())
  }

    return (

<div className="container">
    <div className={`row ${classes.tableWrapper}`}>
    <table className="table table-borderless">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   {products.map(product=> {
     return (
      <tr key={product.id}>
      <th>{product.name}</th>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>
        <button className="btn btn-danger" >delete</button>
        <button className="btn btn-primary" onClick={display}>edit</button>
      </td>
    </tr>
     )
   }
  
  )}
    
  </tbody>
</table>
    </div>
</div>

    )
}
export default Table;