import React from 'react';
import {useSelector, useDispatch} from "react-redux"
import {remove,clear} from "../actions"

const Download = () => {

    const dispatch=useDispatch()

    var key=1;
    const images=useSelector(state=>state.images);

    const download=()=>{
        
        for(let i=0;i<images.length;i++)
        {
            if(images[i].selected)
            {
            var a = document.createElement("a");
            a.href = images[i].source;
            a.download = "Image"+key+".png";
            console.log(a.href)
            a.click();
            key+=1
            dispatch(remove(i))
            }
            
        }
        }



    return ( 
        
        
        <div className="d-flex justify-content-center mb-5 mt-5">
            <div className="row">
            <button onClick={()=>download()} className="btn btn-success">Download Selected Images</button>
            <button onClick={()=>dispatch(clear())} className="btn ml-5 btn-danger">Clear All</button>
        </div>
        </div>
     );
}
 
export default Download;