import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" /><br/>
        <label>Password</label>
        <input type="text" /><br />
        <button>Register</button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username..." /><br/>
        <input type="password" placeholder="Password..." />
        <button>Login</button>
      </div>
    </div>
  );
}

export default App;
