import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';


function SingleExam() {
    const [paperObject, setPaperObject] = useState({});
    const [questions, setQuestions] = useState([]);
    let { paperId } = useParams();
    
    // Access the history object
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5001/paper/byId/${paperId}`)
            .then((response) => {
                setPaperObject(response.data);
                console.log(response.data);
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
        <div>
            <div>{paperObject.subject}</div>
            <div>
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
                        <div
                            onClick={() => handleQuestionClick(question.questionId)}
                            style={{ cursor: 'pointer' }}
                        >{question.questionNo}. {question.question}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SingleExam;


