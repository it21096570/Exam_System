import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function StudentHome() {
    const [studentId, setStudentId] = useState(null);
    const location = useLocation();
    
    useEffect(() => {
        axios.get(`http://localhost:5001/student`)
            .then(response => {
                console.log("Server Response:", response.data);

                setStudentId(response.data.id);
            })
            .catch(error => {
                console.error("Error fetching student id:", error);
            });
    }, []);


    return (
        <div>
            <h1>Student Home</h1>
            

            <Link to={`/studentexamview/?studentId=${studentId}`}>
                <button className="add-exam-button">View exam List</button>
            </Link>
        </div>
    );
}

export default StudentHome;
