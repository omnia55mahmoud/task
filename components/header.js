"use client"
import Image from "next/image";
import classes from "./header.module.css";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "@/public/Logo.png";
import Icon from "@/public/angle-down.svg"
import { useState } from "react";
 const Header = () =>{
    const [displayLogoutBtn , setDisplayLogoutBtn]=useState(false);
    const onDisplayBtnHandler = ()=>{
        setDisplayLogoutBtn(prev=> !prev);
    }
    return(
        <header className={classes.header}>
        <div className="logo">
                <Image src={Logo} alt="Logo"/>
              </div>
              <button className={classes.dropdownBtn} onClick={onDisplayBtnHandler}>
                <p className="mb-0">Hellow World</p>
                <Image src={Icon} alt="angle down icon"/>
               {displayLogoutBtn &&  <Link href="/" className={classes.logOutBtn}>
                 LogOut
                </Link>}
              </button>
        </header>
    )
}

export default Header;