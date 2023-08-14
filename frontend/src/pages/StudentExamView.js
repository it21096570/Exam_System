import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function StudentExamView() {
    const [paperList, setPaperList] = useState([]);

    useEffect(() => {
        // Fetch paper data
        axios.get('http://localhost:5001/paper').then(response => {
                console.log('Response:', response.data);
                setPaperList(response.data);
            }).catch(error => {
                console.error('Error fetching paper data:', error);
            });

    }, []);

    return (
        <div className="view-exam-container">
            <div className="top-bar">
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                </div>
                
            </div>
            <table className="exam-table">
                <thead>
                    <tr>
                        <th>Exam</th>
                        <th>Starting Time</th>
                        <th>Exam Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paperList.map(paper => (
                        <tr key={paper.id}>
                            <td>{paper.subject}</td>
                            <td>{paper.date}</td>
                            <td>{paper.duration + ' h'}</td>
                            <td>{paper.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentExamView
