import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewExam() {
    const [paperList, setPaperList] = useState([]);

    const accessToken = localStorage.getItem('access_token'); // Retrieve the access token from localStorage


    useEffect(() => {
        axios.get('http://localhost:5001/paper', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(response => {
            const responseData = response.data;
            if (Array.isArray(responseData)) {
                setPaperList(responseData);
            } else {
                console.error('Invalid response data format:', responseData);
            }
        })
        .catch(error => {
            console.error('Error fetching paper data:', error);
        });
    }, []);

    return (
        <div>
            <div>
                <input type="text" placeholder="Search" />
                <button>New Exam</button>
            </div>
            <table>
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


/* import React, { useState, useEffect } from 'react';
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
        <div>
            <div>
                <input type="text" placeholder="Search" />
                <button>New Exam</button>
            </div>
            <table>
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
 */