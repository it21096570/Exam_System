import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SingleExam() {
    const [questions, setQuestions] = useState([]);
    const { paperId } = useParams();

    console.log(paperId);

    useEffect(() => {
        // Fetch questions related to the clicked paperId
        axios.get(`http://localhost:5001/questions?paperId=${paperId}`)
            .then(response => {
                console.log(paperId);
                console.log('Response:', response.data);
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, [paperId]);

    return (
        <div>
            <h1>Exam Questions</h1>
            <ul>
                {questions.map(question => (
                    <li key={question.questionId}>{question.question}</li>
                ))}
            </ul>
        </div>
    );
}

export default SingleExam;
