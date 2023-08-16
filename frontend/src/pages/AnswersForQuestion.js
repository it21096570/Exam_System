import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AnswersForQuestion() {
    const [questionObject, setQuestionObject] = useState({});
    const [answers, setAnswers] = useState([]);
    let { questionId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5001/questions/byId/${questionId}`)
            .then((response) => {
                setQuestionObject(response.data);
                console.log(response.data);
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

    return (
        <div>
            <div>
                <h2>Question:</h2>
                <div>{questionObject.question}</div>
            </div>
            <div>
                <h2>Answers:</h2>
                {answers.map((answer, answerIndex) => (
                    <div key={answerIndex}>
                        <div>{answer.answer}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AnswersForQuestion;
