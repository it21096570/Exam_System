import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

function StudentExamView() {
    const [paperList, setPaperList] = useState([]);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        // Fetch paper data
        axios.get('http://localhost:5001/paper')
            .then(response => {

                console.log("Check Response : ", response.data);
                setPaperList(response.data);
            })
            .catch(error => {
                console.error('Error fetching paper data:', error);
            });
    }, []);

    const handlePaperClick = (paperId) => {
        // Redirect to SingleExam page with paperId as a parameter
        const data = {
            paperId: paperId,
            teacherName: "TestTeacher",
        };

        console.log("test id : ", paperId);

        axios.post('http://localhost:5001/stdpaper', data)
            .then(response => {
                console.log('Done!:', response.data);
                // You can also update the UI to reflect the points earned or any other feedback
            })
            .catch(error => {
                console.error('Error saving student answer:', error);
            });

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
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paperList.map((paper, index) => (
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
