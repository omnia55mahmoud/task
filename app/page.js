import Image from "next/image";
import classes from "./page.module.css";

import Link from "next/link";
import Form from "@/components/auth/signup";
import Login from "@/components/auth/login";
export default function Home(props) {
const onLogUser = ()=>{
  console.log("submited");
}
  return (
   <Login/>
  );
}
