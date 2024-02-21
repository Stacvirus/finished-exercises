import { useState } from "react";
import Details from "./Details";

function Para({responce}){
    const [show, setShow] = useState(false)
    const text = responce.name.common
    // console.log(responce.latlng, responce)
    function handleShow(){
        setShow(!show)
      }
    return(
        <div>
            <p>{text} { text != "please be more specific" && <button onClick={handleShow}>show</button>}</p> 
            {show && <div>
                <Details country={responce}/>
            </div>}
        </div>
    )
}

export default Para;