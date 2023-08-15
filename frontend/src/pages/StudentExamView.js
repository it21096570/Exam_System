import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function StudentExamView() {
    const [paperList, setPaperList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // Fetch paper data
        axios.get('http://localhost:5001/paper')
            .then(response => {
                setPaperList(response.data);
            })
            .catch(error => {
                console.error('Error fetching paper data:', error);
            });
    }, []);

    const handlePaperClick = (paperId) => {
        // Redirect to SingleExam page with paperId as a parameter
        history.push(`/single-exam/${paperId}`);
    };

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
                        <tr
                            key={paper.paperId}
                            onClick={() => handlePaperClick(paper.paperId)}
                            style={{ cursor: 'pointer' }}
                        >
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

export default StudentExamView;
