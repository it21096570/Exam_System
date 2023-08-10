import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ViewExam() {
    const [paperList, setPaperList] = useState([]);

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
                        <th>Exam</th>
                        <th>Last Update</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paperList.map(paper => (
                        <tr key={paper.paperId}>
                            <td>{paper.subject}</td>
                            <td>{paper.updatedAt}</td>
                            <td>{paper.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewExam;
