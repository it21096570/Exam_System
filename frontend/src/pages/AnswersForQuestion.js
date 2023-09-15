import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../css/answersForQuestion.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AnswersForQuestion() {
    const [questionObject, setQuestionObject] = useState({});
    const [answers, setAnswers] = useState([]);
    let { paperId, questionId } = useParams();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get(`http://localhost:5001/questions/byId/${questionId}`, {
            headers: {
                Authorization: `${token}`
            }
          }).then((response) => {
                setQuestionObject(response.data);
            })
            .catch((error) => {
                console.error('Error fetching question:', error);
            });

        axios.get(`http://localhost:5001/answers/${questionId}`, {
            headers: {
                Authorization: `${token}`
            }
          }).then((response) => {
                setAnswers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching answers:', error);
            });
    }, [questionId]);

    const handleSubmitAnswer = () => {

        const token = localStorage.getItem('accessToken');
        
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            const selectedAnswerIndex = parseInt(selectedAnswer.id.split('_')[1]);
            const selectedAnswerObject = answers[selectedAnswerIndex];

            // Check if the selected answer is correct or wrong
            const answerStatus = selectedAnswerObject.status;
            const points = answerStatus === 'Correct' ? 5 : 0;



            const data = {

                paperId: paperId,
                questionId: questionId,
                answerId: selectedAnswerObject.answerId,
                points: points,
                answerStatus: answerStatus
            };

            axios.post('http://localhost:5001/studentanswer', data, {
                headers: {
                    Authorization: `${token}`
                }
              }).then(response => {
                    console.log('Student answer saved:', response.data);
                })
                .catch(error => {
                    console.error('Error saving student answer:', error);
                });
        }

        history.push(`/single-exam/${paperId}`);
    };

    return (
        <div className="center-container">
            <div className="answers">
                <h2>Answers:</h2>
                {answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="mcq-option">
                        <input
                            type="radio"
                            name="answer"
                            id={`answer_${answerIndex}`}
                            className="form-check-input"
                        />
                        <label htmlFor={`answer_${answerIndex}`} className="form-check-label">
                            {answer.answer}
                        </label>
                    </div>
                ))}
                <button onClick={handleSubmitAnswer} className="btn btn-primary btn-submit">
                    Submit Answer
                </button>
            </div>
        </div>
    );
}

export default AnswersForQuestion;
