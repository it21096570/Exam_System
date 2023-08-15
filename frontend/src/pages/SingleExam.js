import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SingleExam() {
    const [paperObject, setPaperObject] = useState({});
    const [question, setQuestion] = useState([]);
    let { paperId } = useParams();

    useEffect(() => {
        // Fetch questions related to the clicked paperId
        axios.get(`http://localhost:5001/paper/byId/${paperId}`)
            .then((response) => {
                setPaperObject(response.data);
            })
            .catch((error) => {
                console.error('Error fetching paper:', error);
            });

        axios.get(`http://localhost:5001/questions/${paperId}`)
            .then((response) => {
                setQuestion(response.data);
            })
            .catch((error) => {
                console.error('Error fetching paper:', error);
            });
    }, [paperId]); // Only run the effect when paperId changes

    return (
        <div>
            <div>{paperObject.subject}</div>

            <div>
                {question.map((question,key) => {
                    return <div>{question.question}</div>
                })}
            </div>
        </div>
    );
}

export default SingleExam;
