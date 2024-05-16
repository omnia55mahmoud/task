import Header from "@/components/header";
import classess from "./page.module.css";
import Table from "@/components/table";
import { crudActions } from "@/store";
import { useSelector } from "react-redux";
import ProductsForm from "@/components/productForm/productsForm";
export default function ProfilePage() {

   
  return (
  <>
   <Header />
   <ProductsForm/>
   <Table/>
  </>
  );
}
