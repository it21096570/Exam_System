import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function StudentHome() {
    const [studentId, setStudentId] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const nic = queryParams.get('nic');

    useEffect(() => {
        axios.get(`http://localhost:5001/student/${nic}`)
            .then(response => {
                // Check the response structure and data
                console.log("Server Response:", response.data);

                // Update the studentId state
                setStudentId(response.data.id);
            })
            .catch(error => {
                console.error("Error fetching student id:", error);
            });
    }, [nic]);

    console.log("Rendered studentId:", studentId);

    return (
        <div>
            <h1>Student Home</h1>
            <p>NIC: {nic}</p>
            <p>Student ID: {studentId}</p>

            <Link to={`/studentexamview/?studentId=${studentId}`}>
                <button className="add-exam-button">View exam List</button>
            </Link>
        </div>
    );
}

export default StudentHome;
