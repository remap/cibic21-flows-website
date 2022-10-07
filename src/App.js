import React from 'react';
import './App.css';
import Header from './components/Header.js'
import Footer from './components/Footer.js';
import Viz from './components/Viz.js';


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
