import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleExam() {
    const [questions, setQuestions] = useState([]);
    const { paperId } = useParams(); // Retrieve paperId from URL params

    useEffect(() => {
        // Fetch questions based on paperId
        axios.get(`http://localhost:5001/questions?paperId=${paperId}`)
            .then(response => {
                console.log('Questions:', response.data);
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, [paperId]);

    return (
        <div>
            <h2>Exam</h2>
            <ul>
                {questions.map(question => (
                    <li key={question.questionId}>{question.question}</li>
                ))}
            </ul>
        </div>
    );
}

export default SingleExam;
