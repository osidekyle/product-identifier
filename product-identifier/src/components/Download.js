import React, { } from 'react';
import {useSelector} from "react-redux"


const Download = () => {

    const images=useSelector(state=>state.images);

    const download=()=>{
     
        console.log("downloading")
        }



    return ( 
        
        
        <div className="d-flex justify-content-center mb-5 mt-5">
            <div className="row">
            <button onClick={()=>download()} className="btn btn-success">Download Images</button>
        </div>
        </div>
     );
}
 
export default Download;