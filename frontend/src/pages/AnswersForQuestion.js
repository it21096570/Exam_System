

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';


function AnswersForQuestion() {
    const [questionObject, setQuestionObject] = useState({});
    const [answers, setAnswers] = useState([]);
    let { questionId } = useParams();

    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5001/questions/byId/${questionId}`)
            .then((response) => {
                setQuestionObject(response.data);
            })
            .catch((error) => {
                console.error('Error fetching question:', error);
            });

        axios.get(`http://localhost:5001/answers/${questionId}`)
            .then((response) => {
                setAnswers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching answers:', error);
            });
    }, [questionId]);

    const handleSubmitAnswer = () => {
        // Logic to submit the selected answer
        history.goBack();
    };

    return (
        <div className="answers-container">
            <div className="question">
                <h2>Question:</h2>
                <div>{questionObject.question}</div>
            </div>
            <div className="answers">
                <h2>Answers:</h2>
                {answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="mcq-option">
                        <input
                            type="radio"
                            name="answer"
                            id={`answer_${answerIndex}`}
                            className="radio-input"
                        />
                        <label htmlFor={`answer_${answerIndex}`} className="radio-label">
                            {answer.answer}
                        </label>
                    </div>
                ))}
                <button onClick={handleSubmitAnswer} className="submit-button">
                    Submit Answer
                </button>
            </div>
        </div>
    );
}

export default AnswersForQuestion;
