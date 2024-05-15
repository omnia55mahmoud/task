"use client"
import classes from "./form.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
const SignUp = () =>{
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState(false);
    let router=useRouter()
    let  validateForm=false;
    useEffect(() => {
        const users = localStorage.getItem("users");
        if (!users) {
            localStorage.setItem('users', JSON.stringify([]));
        } else {
            console.log('Existing users:', JSON.parse(users));
        }
    }, []);

    function onSubmitHandler(event){
        event.preventDefault()
        const fd=new FormData(event.target);
        const data= Object.fromEntries(fd.entries());
        let hasError = false;
        if(!data.email.includes("@")){
          setEmailError(true);
          hasError = true;
        }
        else{
          setEmailError(false);
        }
       
        if (data.password.length < 8) {
          setPasswordError(true);
          hasError = true;
      } else {
          setPasswordError(false);
      }
        if(!hasError){
            
            const existingUsers = JSON.parse(localStorage.getItem('users'));
            const isEmailExist = existingUsers.some(user => user.email === data.email);
            if(isEmailExist){
                setEmailExistsError(true)
            }
            else{
                setEmailExistsError(false)
                existingUsers.push(data); 
                localStorage.setItem('users', JSON.stringify(existingUsers)); 
                console.log('User data saved:', data);
                router.push("/")
            }
           
        }
 
      console.log(data.email);
    }
   
    return(
        <div className={`container ${classes.main}`}>
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-4">
            <div className={classes.card}>
              <div className={`card-body ${classes["card-body"]}`}>
                <h4>Sign up</h4>
          
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter your name"
                        defaultValue={name}
                        name="name"
                      />
                    </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      name="email"
                     

                    />
                   {emailError && <p className={classes.errTxt}>Invalid email format.</p>}
                   {emailExistsError && <p className={classes.errTxt}>Email is already exist</p>}
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
                  {passwordError && <p className={classes.errTxt}>Must be 8 or more characters.</p>}
                  </div>
              
                  <button className="btn btn-primary w-100">Submit</button>
                  <div className={classes.sperator}>OR</div>
                    <p className={classes.link}>Already have an account? <Link href="/">Login</Link></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default SignUp;

