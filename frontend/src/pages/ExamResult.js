import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function ExamResult() {
    const [totalPoints, setTotalPoints] = useState(null);
    const { paperId } = useParams();
    const [grade, setGrade] = useState('W');
    const [passFailStatus, setPassFailStatus] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5001/studentanswer/${paperId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                setTotalPoints(response.data.totalPoints);
                // ... Determine grade based on totalPoints
            })
            .catch(error => {
                console.error(error);
            });
    }, [paperId]);

    useEffect(() => {
        // Update passFailStatus and grade based on totalPoints
        if (totalPoints !== null) {
            if (totalPoints >= 0 && totalPoints <= 35) {
                setGrade('W');
                setPassFailStatus('Failed');
            } else if (totalPoints > 35 && totalPoints <= 55) {
                setGrade('D');
                setPassFailStatus('Passed');
            } else if (totalPoints > 55 && totalPoints <= 65) {
                setGrade('C');
                setPassFailStatus('Passed');
            } else if (totalPoints > 65 && totalPoints <= 75) {
                setGrade('B');
                setPassFailStatus('Passed');
            } else if (totalPoints > 75) {
                setGrade('A');
                setPassFailStatus('Passed');
            }
        }
    }, [totalPoints]);

    return (
        <div className="exam-result-container">
            {totalPoints !== null ? (
                <div className="result-box">
                    <p className={`pass-status ${passFailStatus.toLowerCase()}`}>
                        {passFailStatus}
                    </p>
                    <p style={{color: "black"}}>{grade} - {totalPoints}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}


export default ExamResult;
