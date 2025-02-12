import React from 'react';
import './App.css';
import Calculator from './components/Calculator';
import Graph from './components/Graph';

const App = () => {
  return (
    <div className="App">
      <div className="area">
        <Calculator />
        <Graph />
      </div>
    </div>
  );
}

export default App;
