import notFoundImage from "@/public/notFoundVector.svg"
import Image from "next/image";
function NotFound(){
    return(
       <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100vh"

       }}>
        <Image src={notFoundImage} alt="Not Found"/>
       </div>
    )
}
export default NotFound;