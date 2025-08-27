// frontend/src/App.js
import React from 'react';
import Form from './components/Form';
import './App.css'; // We'll add some basic styling

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Please fill out the form below.</p>
      </header>
      <main>
        <Form />
      </main>
    </div>
  );
}

export default App;
