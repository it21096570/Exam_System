import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/examResult.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ExamResult() {
    const [totalPoints, setTotalPoints] = useState(null);
    const { paperId } = useParams();
    const [grade, setGrade] = useState('W');
    const [passFailStatus, setPassFailStatus] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        
        axios.get(`http://localhost:5001/studentanswer/${paperId}`, {
            headers: {
                Authorization: `${token}`
            }
          })
            .then(response => {

                console.log("Data", response.data); // Check the entire response data
                setTotalPoints(response.data.totalPoints);
                // ... Determine grade based on totalPoints
            })
            .catch(error => {
                console.error(error);
            });
    }, [paperId]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get(`http://localhost:5001/studentanswer/byPaperId/${paperId}`, {
            headers: {
                Authorization: `${token}`
            }
          })
            .then(response => {

                console.log("Questions", response.data); // Check the questions array
                setQuestions(response.data);
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
                setPassFailStatus('FAILED');
            } else if (totalPoints > 35 && totalPoints <= 55) {
                setGrade('D');
                setPassFailStatus('PASSED');
            } else if (totalPoints > 55 && totalPoints <= 65) {
                setGrade('C');
                setPassFailStatus('PASSED');
            } else if (totalPoints > 65 && totalPoints <= 75) {
                setGrade('B');
                setPassFailStatus('PASSED');
            } else if (totalPoints > 75) {
                setGrade('A');
                setPassFailStatus('PASSED');
            }
        }
    }, [totalPoints]);

    return (
        <div className="container result-container">
            <div className={`result-box ${passFailStatus.toLowerCase()} p-4 shadow`}>
                <p className={`pass-status ${passFailStatus.toLowerCase()}`}>{passFailStatus}</p>
                <p className="grade-container">{grade} - {totalPoints}</p>
            </div>
            <div className="question-status mt-4">
                
                {questions.length > 0 && (
                    <QuestionList questions={questions} />
                )}
            </div>
        </div>
    );
}

function QuestionList({ questions }) {
    return (
        <div className="question-list">
            <h2 className="question-status">Question Review</h2>
            {questions.map((question, index) => (
                <div className={`status ${question.answerStatus.toLowerCase()}`} key={index}>
                    Question {index + 1}: {question.answerStatus}
                </div>
            ))}
        </div>
    );
}

export default ExamResult;
