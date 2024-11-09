import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import Clock from './components/clock';


function App(props) {
  return (
    <div className="App">
      <Clock />
    </div>
  );
}

export default App;
