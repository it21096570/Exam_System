import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



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

                localStorage.setItem("accessToken", response.data.accessToken);
                const role = response.data.role;
                const nic = response.data.nic;
    
                console.log(role);

                axios.defaults.headers.common['accessToken'] = response.data.accessToken;


    
                if (role === "student" || role === "Student") {
                    history.push(`/studenthome?nic=${nic}`);
                } else if (role === "teacher" || role === "Teacher") {
                    history.push("/teacherhome");
                } else {
                    history.push("/");
                }

                alert("Login successful!");
            }
        });
    };


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
