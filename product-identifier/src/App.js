import React from 'react';
import './App.css';
import Camera from "./components/Camera"
import Images from "./components/Images"
import Header from "./components/Header"



function App() {
  return (
    <div className="App container">
      <Header/>
      <Camera/>
      <Images/>
    </div>
  );
}

export default App;
