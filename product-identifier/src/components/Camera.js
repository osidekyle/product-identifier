import React, { useEffect,useState, useRef} from 'react';
import bootstrap from "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import {addImage} from "../actions"
import {useSelector, useDispatch} from "react-redux"
import * as faceapi from '../../../node_modules/face-api.js'


const Camera = () => {
    const [loaded, setLoaded] = useState(false)
    const [video, setVideo]=useState(false)

    const images = useSelector(state=>state.images)
    const dispatch=useDispatch();



    const videoRef=useRef(null)
    const canvasRef=useRef(null)

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


    const detection=async ()=>{
        Promise.all([
        await faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        await faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        await faceapi.nets.faceRecognitionNet.loadFromUri('./models'),          
        await faceapi.nets.faceExpressionNet.loadFromUri('./models')
        ])
        if(video==true){
        setInterval(async ()=>{
            const detections= await faceapi.detectAllFaces(videoRef.current,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            console.log(detections)
        },100)
    }
    }

    const takePicture=()=>{

            var context=canvasRef.current.getContext('2d')
        
            canvasRef.current.width=100
            canvasRef.current.height=100
            context.drawImage(videoRef.current,0,0,100,100)

            const data = canvasRef.current.toDataURL("image/png");
            
            dispatch(addImage(data));
            console.log(images)
    }

    useEffect(()=>{
       
            setLoaded(true)
    },[])

    return ( 
        <div className="camera container">
          
            {video ? null : loaded ? <button className="btn btn-primary camera-button" onClick={takeVideo}>Capture Product</button> : null}
            {video ? <button onClick={()=>takePicture()} className="btn btn-primary picture-button">Take Picture</button> : null}
            <video onPlay={detection()} ref={videoRef} width="720" height="560" id="video" autoPlay={true}>
            <canvas ref={canvasRef} height="0" width="0"/>

            
            </video>
            
        </div>
     );
}
 
export default Camera;