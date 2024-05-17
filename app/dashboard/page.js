"use client";
import Header from "@/components/header";
import Table from "@/components/table";
import ProductsForm from "@/components/productForm/productsForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { notFound } from "next/navigation";
import { useState } from "react";
import Loader from "@/components/loader";
export default function ProfilePage() {
  const {isAuthorized} = useSelector((state) => state.crud);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isAuthorized) {
     notFound()
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading ? (
        <div
          className="w-100"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
         <Loader/>
        </div>
      ) : (
        <>
          <Header />
          <ProductsForm />
          <Table />
        </>
      )}
    </>
  );
}
