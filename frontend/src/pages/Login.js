import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:5001/user/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("access_token", response.data.accessToken);
                const role = response.data.role;
                if (role === "student" || role === "Student") {
                    history.push("/studenthome");
                } else if (role === "teacher" || role === "Teacher") {
                    history.push("/teacherhome");
                } else {
                    // Default redirection for other roles or handle as needed
                    history.push("/");
                }
            }
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
