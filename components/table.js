"use client";
import classes from "./table.module.css";
import { useSelector, useDispatch } from "react-redux";
import { crudActions } from "@/store";
import { useTable } from "react-table";
import { CSVLink } from "react-csv";
const Table = () => {
  const { products } = useSelector((state) => state.crud.currentUser);
  const dispatch = useDispatch();
  const handleEdit = (id) => {
    dispatch(crudActions.editProduct({ id }));
  };
  const handleDelete = (id) => {
    dispatch(crudActions.deleteProduct({ id }));
  };
  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Price', key: 'price' },
    { label: 'Quantity', key: 'quantity' }
  ];
  console.log(products);

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
                    <button className="btn btn-danger mx-2"   onClick={() => handleDelete(product.id)}>delete</button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(product.id)} style={{background:"#26B7CD", border:"none"}}>
                      edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      <div className="text-center mt-3">
      <CSVLink className="btn btn-primary" data={products} headers={headers} separator={";"} filename="products.csv" style={{background:"#26B7CD", border:"none"}}>
        Export
      </CSVLink>
      </div>
      </div>
    </div>
  );
};
export default Table;
