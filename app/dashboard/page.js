"use client";
import Header from "@/components/header";
import Table from "@/components/table";
import ProductsForm from "@/components/productForm/productsForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProfilePage() {
  const isAuth = useSelector((state) => state.crud.isAuthorized);
console.log(isAuth);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  useEffect(() => {
    if (!isAuth) {
      push("/");
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
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
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
