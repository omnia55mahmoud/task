"use client"
import classes from "./form.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
const Login=()=>{
    const router=useRouter()
    const [error,setError]=useState(false);
    function onSubmitHandler(event){
        event.preventDefault()
        const fd=new FormData(event.target);
        const data= Object.fromEntries(fd.entries());
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(user => user.email === data.email);

        if (user && user.password === data.password) {
            router.push("/profile")
            setError(false)
        } else {
            console.log('Login failed');
            setError(true)
        }
      
    }
return(
    <div className={`container ${classes.main}`}>
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-lg-4">
        <div className={classes.card}>
          <div className={`card-body ${classes["card-body"]}`}>
            <h4>Sign in</h4>
            {error &&
            <div className={classes.error}>
              <p>Invalid email or password!</p>
            </div>}
            <form onSubmit={onSubmitHandler}>
           
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                                 
                />
              </div>
          
              <button className="btn btn-primary w-100">Submit</button>
              <div className={classes.sperator}>OR</div>
                <p className={classes.link}>Don’t have account? <Link href="/signup">Signup</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
export default Login;