import React from 'react';
import './App.css';
import Expenses from './components/Expenses';

function App() {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <Expenses />
      </div>
    </div>
  );
}

export default App;
