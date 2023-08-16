import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

//import './SingleExam.css'; // Import the CSS file for this component

function SingleExam() {
    const [paperObject, setPaperObject] = useState({});
    const [questions, setQuestions] = useState([]);
    let { paperId } = useParams();
    
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5001/paper/byId/${paperId}`)
            .then((response) => {
                setPaperObject(response.data);
            })
            .catch((error) => {
                console.error('Error fetching paper:', error);
            });

        axios.get(`http://localhost:5001/questions/${paperId}`)
            .then((response) => {
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    }, [paperId]);

    const handleQuestionClick = (questionId) => {
        history.push(`/answers-question/${questionId}`);
    };

    return (
        <div className="single-exam-container">
            <div className="paper-subject">{paperObject.subject}</div>
            <div className="question-list">
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="question-item">
                        <div
                            onClick={() => handleQuestionClick(question.questionId)}
                            className="question-text"
                        >{question.questionNo}. {question.question}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SingleExam;
