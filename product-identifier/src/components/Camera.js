import React, { useEffect,useState, useRef} from 'react';
import bootstrap from "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import {addImage} from "../actions"
import {useSelector, useDispatch} from "react-redux"
import * as faceapi from '../../../node_modules/face-api.js'


const Camera = () => {
    const [loaded, setLoaded] = useState(false)
    const [video, setVideo]=useState(false)




    const[height,setHeight]=useState(0);
    const[width,setWidth]=useState(0);

    const images = useSelector(state=>state.images)
    const dispatch=useDispatch();



    const videoRef=useRef(null)
    const canvasRef=useRef(null)

    const takeVideo = async ()=>{
       if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
           console.log("oh hell yeahh");
       }
       setVideo(true)
       try{
       const stream = await navigator.mediaDevices.getUserMedia({video:{width: { min: 640, ideal: 1920 },
        height: { min: 400, ideal: 1080 },
        aspectRatio: { ideal: 1.7777777778 }}})
        setHeight(stream.getVideoTracks()[0].getSettings().height)
        setWidth(stream.getVideoTracks()[0].getSettings().width)
       videoRef.current.srcObject=stream;
       


       
       
       }
       catch{
           alert("Make sure your camera is on!")
       }
    }


    const detection=async()=>{
        
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models')          
        await faceapi.nets.faceExpressionNet.loadFromUri('/models')

        
        if(video==true && loaded==true){

        

        setInterval(async ()=>{
            const detections= await faceapi.detectAllFaces(videoRef.current,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            console.log(detections)
            if(detections[0]){
            if(detections[0].expressions.happy>=.9)
            {
                takePicture()
            }
        }

        },750)
    }}

    const takePicture=()=>{

            var context=canvasRef.current.getContext('2d')
        
            canvasRef.current.width=width
            canvasRef.current.height=height
            context.drawImage(videoRef.current,0,0,width,height)

            const data = canvasRef.current.toDataURL("image/png");
            
            dispatch(addImage(data));
            console.log(images)
    }

    useEffect(()=>{
       
             
            
            setLoaded(true)
            console.log("loaded")
    },[])

    return ( 
        <div className="camera container">
            
            {video ? 
            <div className="d-flex justify-content-center">
             <div className="row">
                 
                </div>
            <div className="row">
                
            <video onPlay={()=>detection()} ref={videoRef} width="720" height="560" id="video" autoPlay={true}><canvas ref={canvasRef} height="0" width="0"/></video>
            </div>
            </div>

: null}
        <div className="row d-flex justify-content-center">

            {video ? null : loaded ? <button className="btn btn-primary justify-content-center camera-button" onClick={takeVideo}>Start Taking Pictures</button> : null}
            {video ? <button onClick={()=>takePicture()} className="btn btn-primary mb-5 justify-content-center picture-button">Take Picture</button> : null}
             
            
        </div>
        </div>
     );
}
 
export default Camera;