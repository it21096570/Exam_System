
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function AnswersForQuestion() {
    const [questionObject, setQuestionObject] = useState({});
    const [answers, setAnswers] = useState([]);
    let { paperId, questionId } = useParams();
    const history = useHistory();
    const location = useLocation();
    

    console.log("Paper ID:", paperId);
    

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

            axios.post('http://localhost:5001/studentanswer', data)  // Adjust the endpoint URL accordingly
                .then(response => {
                    console.log('Student answer saved:', response.data);
                    // You can also update the UI to reflect the points earned or any other feedback
                })
                .catch(error => {
                    console.error('Error saving student answer:', error);
                });
        }

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
