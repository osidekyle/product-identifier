import React, { } from 'react';
import {useSelector} from "react-redux";

const Images = () => {

    const images=useSelector(state=>state.images)

    const imageStyle={
        width:"23%",
        margin:"1%",
        border:'solid 5px grey',
        borderRadius:"15px"
    }

    return ( 
        <div>
        {images.map(image=>(
            <img style={imageStyle} src={image}/>
    ))}
    </div>
     );
     
    
}
 
export default Images;