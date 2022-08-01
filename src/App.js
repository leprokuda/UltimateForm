import React from 'react';
import Submiting from './ajax';
import './App.css';
import Form from './Form';
import './sendmail.php'


function App() {

  return (
    <div className="App">
      <Form/>
      <Submiting/>
    </div>
  );
}

export default App;
