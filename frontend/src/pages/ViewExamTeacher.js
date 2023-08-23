import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';


import axios from 'axios';

function ViewExamTeacher() {

    const [paperList, setPaperList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // Fetch paper data
        axios.get('http://localhost:5001/paper')
            .then(response => {
                console.log('Response:', response.data);
                setPaperList(response.data);
            })
            .catch(error => {
                console.error('Error fetching paper data:', error);
            });
    }, []);

    const onClick = (paperId) => {

        history.push(`/updateviewexam/${paperId}`);

    };

    return (
        <div className="view-exam-container">
            <div className="top-bar">
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="new-exam-button">
                    <a href="/addexam">
                        <button>New Exam</button>
                    </a>
                </div>
            </div>
            <table className="exam-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Exam</th>
                        <th>Last Update</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paperList.map(paper => (
                        <tr key={paper.paperId}>
                            <td>{paper.paperId}</td>
                            <td>{paper.subject}</td>
                            <td>{paper.updatedAt}</td>
                            <td>{paper.status}</td>
                            <td>

                                <button onClick={() => onClick(paper.paperId)}>Update</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewExamTeacher


