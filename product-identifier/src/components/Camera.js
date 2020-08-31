import React, { useEffect,useState, useRef} from 'react';
import bootstrap from "../../../node_modules/bootstrap/dist/css/bootstrap.css"

const Camera = () => {
    const [loaded, setLoaded] = useState(false)
    const [source, setSource]= useState({});
    const [video, setVideo]=useState(false)

    const videoRef=useRef(null)
    const canvasRef=useRef(null)
    const photoRef=useRef(null)

    const takeVideo = async ()=>{
       if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
           console.log("oh hell yeahh");
       }
       try{
       const stream = await navigator.mediaDevices.getUserMedia({video:true})
       videoRef.current.srcObject=stream;
       setVideo(true)
       
       }
       catch{
           console.log("make sure camera is on")
       }
    }


    const takePicture=()=>{

            var context=canvasRef.current.getContext('2d')
        
            canvasRef.current.width=100
            canvasRef.current.height=100
            context.drawImage(videoRef.current,0,0,100,100)

            const data = canvasRef.current.toDataURL("image/png");
            
            photoRef.current.src=data
        
    }

    useEffect(()=>{
        setLoaded(true);
    },[])

    return ( 
        <div className="camera container">
            {video ? null : loaded ? <button className="btn btn-primary camera-button" onClick={takeVideo}>Capture Product</button> : null}
            {video ? <button onClick={()=>takePicture()} className="btn btn-primary picture-button">Take Picture</button> : null}
            <video ref={videoRef} id="video" autoPlay={true}>
            <canvas ref={canvasRef} height="0" width="0"/>

            
            </video>
            <img ref={photoRef}/>
        </div>
     );
}
 
export default Camera;