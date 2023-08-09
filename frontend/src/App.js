import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link> <br />
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
