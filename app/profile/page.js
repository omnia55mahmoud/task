import Header from "@/components/header";
import classess from "./page.module.css";
import Table from "@/components/table";
export default function ProfilePage() {
  return (
  <>
   <Header />
   <div className={`container ${classess.formWrapper}`}>
    <div className="row">
     <div className="d-flex justify-content-between align-items-center">
     <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Enter your name"
        />
    </div>
    <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input
        type="text"
        className="form-control"
        id="price"
        placeholder="Enter price"
        />
    </div>
    <div className="mb-3">
        <label htmlFor="quantity" className="form-label">Quantity</label>
        <input
        type="number"
        className="form-control"
        id="quantity"
        placeholder="Enter quantity"
        />
    </div>
    <button className="btn btn-primary">Add</button>
     </div>
    </div>
   </div>
   <Table/>
  </>
  );
}
