import classes from "./wrapper.module.css"
const Wrapper =({children,title})=>{
   return (
     <div className={`container ${classes.main}`}>
       <div className="row justify-content-center align-items-center h-100">
         <div className="col-lg-4">
           <div className={classes.card}>
             <div className={`card-body ${classes["card-body"]}`}>
               <h4>{title}</h4>
               {children}
             </div>
           </div>
         </div>
       </div>
     </div>
   );
}
export default Wrapper