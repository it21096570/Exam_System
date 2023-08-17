import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function SingleExam() {
    const [paperObject, setPaperObject] = useState({});
    const [questions, setQuestions] = useState([]);

    const location = useLocation();
    const history = useHistory();


    
    
    const { paperId } = useParams();
    const searchParams = new URLSearchParams(location.search);
    const studentId = searchParams.get('studentId');

    console.log("Paper ID:", paperId);
    console.log("Student ID:", studentId);
    
    

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
        history.push(`/answers-question/${paperId}/${questionId}?studentId=${studentId}`);
    };

    const handleFinishPaper = () => {
        
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
            <button className="submit-button" onClick={handleFinishPaper}>Finish Paper</button>
        </div>
    );
}

export default SingleExam;
