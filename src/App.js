import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header.js'
import Footer from './Footer.js';
import Viz from './Viz.js';


function App() {
  return (
    <div className="App">
      <Header />
      <Viz />
      <Footer />
    </div>
  );
}

export default App;
