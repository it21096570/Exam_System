import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/login.css';
import 'bootstrap/dist/css/bootstrap.css';



function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const login = () => {
        const data = { username: username, password: password };

        axios.post("http://localhost:5001/user/login", data).then((response) => {

            if (response.data.error) {
                alert(response.data.error);

            } else {

                //localStorage.setItem("accessToken", response.data.accessToken);
                const role = response.data.role;
                const nic = response.data.nic;
                const token = response.data.accessToken;

                console.log(role);
                console.log(nic);

                axios.defaults.headers.common['accessToken'] = response.data.accessToken;


                localStorage.setItem('accessToken', token);
                localStorage.setItem('role', role);

                if (role === "student" || role === "Student") {
                    props.setUserRole(role);
                    history.push(`/studentexamview`);

                } else if (role === "teacher" || role === "Teacher") {
                    props.setUserRole(role);
                    history.push("/viewexamteacher");

                } else {
                    history.push("/");
                }

                alert("Login successful!");
            }
        })
            .catch((error) => {
                console.error("Login error:", error);
                alert("An error occurred during login.");
            });
    };

    const Register = () => {
        history.push("/register");
    }


    return (
        <div className="login-bg">
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card login-card">
                    <div className="card-body">
                        <h4 className="card-title text-center mb-4">Login</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    onChange={(event) => {
                                        setUsername(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                                <button type="button" className="btn btn-success" onClick={Register}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );




}

export default Login;
