import React, { } from 'react';
import {selectImage} from "../actions"
import {useSelector, useDispatch} from "react-redux"



const Images = () => {

    const images=useSelector(state=>state.images);
    
    const dispatch=useDispatch();

    


    const imageStyle={
        width:"23%",
        margin:"1%",
        border:'solid 10px grey',
        borderRadius:"15px"
    }
    const selectedStyle={
        width:"23%",
        margin:"1%",
        border:'solid 10px green',
        borderRadius:"15px"
    }
    
    return ( 
       
        <div>
        {images.map(image=>(
           image.selected ?  <img onClick={()=>{dispatch(selectImage(image.source))}}  style={selectedStyle}  src={image.source}/> :  <img onClick={()=>{dispatch(selectImage(image.source))}} border={image.color} style={imageStyle} src={image.source}/> 
            
    ))}
    
    </div>
    );
     
    
}
 
export default Images;