import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import '../css/singleExam.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SingleExam() {
    const [paperObject, setPaperObject] = useState({});
    const [questions, setQuestions] = useState([]);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isExamFinished, setIsExamFinished] = useState(false);

    const history = useHistory();
    const { paperId } = useParams();
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        // Load paper details
        axios.get(`http://localhost:5001/paper/byId/${paperId}`, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((response) => {
                setPaperObject(response.data);
                const paperDurationHours = response.data.duration;
                setRemainingTime(paperDurationHours * 3600); // Convert hours to seconds
            })
            .catch((error) => {
                console.error('Error fetching paper:', error);
            });

        // Load questions
        axios.get(`http://localhost:5001/questions/${paperId}`, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((response) => {
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    }, [paperId]);

    useEffect(() => {
        // Start the timer and finish the paper when time is up
        const timer = setInterval(() => {
            if (remainingTime > 0 && !isExamFinished) {
                setRemainingTime(prevTime => prevTime - 1);
            } else if (!isExamFinished) {
                setIsExamFinished(true);
                clearInterval(timer); // Stop the timer
                history.push(`/examresult/${paperId}`);
            }
        }, 1000);

        return () => {
            clearInterval(timer); // Stop the timer when the component unmounts
        };
    }, [remainingTime, isExamFinished]);

    const handleQuestionClick = (questionId) => {
        if (!isExamFinished) {
            history.push(`/answers-question/${paperId}/${questionId}`);
        }
    };

    const handleFinishPaper = () => {
        if (!isExamFinished) {
            setIsExamFinished(true);
            history.push(`/examresult/${paperId}`);
        }
    };

    return (
        <div className="container single-exam-container">
            <div className="paper-header text-center mt-4">
                <h2>Exam: {paperObject.subject}</h2>
                {remainingTime > 0 && (
                    <p>
                        Time Remaining: {formatTime(remainingTime)}
                    </p>
                )}
            </div>
            <div className="question-list mt-4">
                {questions.map((question, questionIndex) => (
                    <div
                        key={questionIndex}
                        className={`question-item mb-3 p-3 shadow ${isExamFinished ? 'disabled' : ''}`}
                        onClick={() => handleQuestionClick(question.questionId)}
                    >
                        <div className="question-text">
                            <p>
                                <strong>Question {question.questionNo}:</strong> {question.question}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button className={`btn btn-primary ${isExamFinished ? 'disabled' : ''}`} onClick={handleFinishPaper}>
                    Finish Exam
                </button>
            </div>
        </div>
    );
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} hours ${minutes} minutes ${remainingSeconds} seconds`;
}

export default SingleExam;
