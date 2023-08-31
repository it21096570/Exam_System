import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import '../css/viewexamteacher.css'; // Create this CSS file for custom styles
import 'bootstrap/dist/css/bootstrap.css';


import axios from 'axios';

function ViewExamTeacher() {
    const [paperList, setPaperList] = useState([]);
    const [filteredPapers, setFilteredPapers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const history = useHistory();


    useEffect(() => {

        const token = localStorage.getItem('accessToken');

        // Fetch paper data
        axios.get('http://localhost:5001/paper', {
            headers: {
                Authorization: `${token}`
            }
        })
            .then(response => {
                setPaperList(response.data);
                //alert(response.data.paperId)
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
                <div className="search-bar input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="new-exam-button">
                    <a href="/addexam">
                        <button className="btn btn-success">New Exam</button>
                    </a>
                </div>
            </div>
            <table className="table exam-table">
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
                                <button className="btn btn-primary btn-action" onClick={() => onClick(paper.paperId)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewExamTeacher


