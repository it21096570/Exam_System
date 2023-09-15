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
    const [total, setTotal] = useState(null);
    const [totGrade, setTotGrade] = useState(null);

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

        axios.get(`http://localhost:5001/questions/totalnum/${paperId}`, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        })
            .then((response) => {
                console.log("No of Qs : ", response.data.totalQuestions);
                const a = response.data.totalQuestions * 5;

                console.log("tot marks : ", a);
                setTotal(a);
            })
            .catch((error) => {
                console.error('Error fetching Total:', error);
            });
    }, []);

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
        const gradeT = ((parseInt(totalPoints, 10) / parseInt(total, 10)) * 100);
        setTotGrade(gradeT);
    }, [totalPoints, total]);

    useEffect(() => {

        console.log("Total : ", total);
        console.log("Points : ", totalPoints);
        console.log("Grade : ", totGrade);

        // Update passFailStatus and grade based on totalPoints
        if (totGrade !== null) {
            if (totGrade >= 0 && totGrade <= 35) {
                setGrade('W');
                setPassFailStatus('FAILED');
            } else if (totGrade > 35 && totGrade <= 55) {
                setGrade('D');
                setPassFailStatus('PASSED');
            } else if (totGrade > 55 && totGrade <= 65) {
                setGrade('C');
                setPassFailStatus('PASSED');
            } else if (totGrade > 65 && totGrade <= 75) {
                setGrade('B');
                setPassFailStatus('PASSED');
            } else if (totGrade > 75) {
                setGrade('A');
                setPassFailStatus('PASSED');
            }
        }
    }, [totGrade]);

    console.log(total);

    return (
        <div className="container result-container">
            <div className={`result-box ${passFailStatus.toLowerCase()} p-4 shadow`}>
                <p className={`pass-status ${passFailStatus.toLowerCase()}`}>{passFailStatus}</p>
                <p className="grade-container">{grade} - {totGrade}</p>
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
