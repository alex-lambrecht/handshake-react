import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as handTrack from '../node_modules/handtrackjs';

function App() {
  return (
    <div className="App">
      <div>
        <video class="videobox canvasbox" autoplay="autoplay" id="myvideo"></video>
        <canvas id="canvas" class="border canvasbox"></canvas>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload LOL.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


    </div>

    
  );
}
export default App;





