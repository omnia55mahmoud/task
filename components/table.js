"use client";
import classes from "./table.module.css";
import { useSelector, useDispatch } from "react-redux";
import { crudActions } from "@/store";
const Table = () => {
  const { products } = useSelector((state) => state.crud.currentUser);
  const dispatch = useDispatch();
  const handleEdit = (id) => {
    dispatch(crudActions.editProduct({ id }));
  };
  return (
    <div className="container">
      <div className={`row ${classes.tableWrapper}`}>
        <table className="table table-borderless">
          <thead>
            <tr className="text-center">
              <th className="text-start" scope="col">
                Name
              </th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id} className="text-center">
                  <th className="text-start">{product.name}</th>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td className="text-center">
                    <button className="btn btn-danger mx-2">delete</button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(product.id)}>
                      edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
