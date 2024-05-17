"use client"
import Image from "next/image";
import classes from "./header.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "@/public/Logo.png";
import Icon from "@/public/angle-down.svg"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crudActions } from "@/store";
import { useRouter } from "next/navigation";
 const Header = () =>{
    const [displayLogoutBtn , setDisplayLogoutBtn]=useState(false);
    const router=useRouter()
    const dispatch=useDispatch();
    const onDisplayBtnHandler = ()=>{
        setDisplayLogoutBtn(prev=> !prev);
    }
    const logoutHandler=()=>{
      console.log("log out !");
      dispatch(crudActions.userLogout())
      router.push("/")
    }
    return(
        <header className={classes.header}>
        <div className="logo">
                <Image src={Logo} alt="Logo"/>
              </div>
              <button className={classes.dropdownBtn} onClick={onDisplayBtnHandler}>
                <p className="mb-0">Hellow World</p>
                <Image src={Icon} alt="angle down icon"/>
                {displayLogoutBtn &&  <button href="/" className={classes.logOutBtn} onClick={logoutHandler}>
                 LogOut
                </button>}
              </button>
        </header>
    )
}

export default Header;