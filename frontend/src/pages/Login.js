import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:5001/user/login", data).then((response) => {
            console.log(response);
        });
    }

    return (
        <div className="loginContainer">
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <button onClick={login}>Login</button>
        </div>
    );


}

export default Login;
