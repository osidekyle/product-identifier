import React from 'react';
import './App.css';
import Camera from "./components/Camera"
import Images from "./components/Images"
import Header from "./components/Header"
import Download from "./components/Download"
import bootstrap from "../../node_modules/bootstrap/dist/css/bootstrap.css"
import {useSelector} from "react-redux"

function App() {

  const images=useSelector(state=>state.images)

  return (
    <div className="App container">
      <div className="d-flex justify-content-center">
      <div className="row">
        
      <Header/>
      
      </div>
      </div>
      <div className='row'>
      <Camera/>
      </div>
      
     
      <Images/>
      
      {images.length>0 ?
      
      <Download/>
     
      : null}
    </div>
  );
}

export default App;
