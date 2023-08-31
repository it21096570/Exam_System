import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/addanswers.css';


function AddAnswers() {
    const [questionId, setQuestionId] = useState('');
    const [answer, setAnswer] = useState('');
    const [mark, setMark] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        
        const token = localStorage.getItem('accessToken');

        async function fetchLatestQuestionId() {
            try {
                const response = await axios.get('http://localhost:5001/answers/latestQuestionId', {
                    headers: {
                        Authorization: `${token}`
                    }
                });

                const latestQuestionId = response.data.latestQuestionId;

                console.log("Response:", response);
                console.log("Latest Question ID:", latestQuestionId);

                setQuestionId(latestQuestionId);

            } catch (error) {
                console.error('Error fetching latest Question ID:', error);
            }
        }

        fetchLatestQuestionId();
    }, []);

    const handleSubmit = async (event) => {

        const token = localStorage.getItem('accessToken');

        event.preventDefault();

        const newAnswer = {
            questionId,
            answer,
            mark,
            status,
        };

        try {
            await axios.post('http://localhost:5001/answers', newAnswer, {
                headers: {
                    Authorization: `${token}`
                }
            });

            console.log('Answer added successfully');
            console.log(newAnswer);

        } catch (error) {
            console.error('Error adding Question:', error);
        }
    };

    return (
        <div className="add-exam-container">
            <div className="add-exam-card">
                <h2>Add Answers</h2>
                <form className="exam-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="questionId">Question ID:</label>
                        <input
                            type="text"
                            id="questionId"
                            name="questionId"
                            value={questionId}
                            onChange={(e) => setQuestionId(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="answer">Answer:</label>
                        <input
                            type="text"
                            id="answer"
                            name="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mark">Marks:</label>
                        <input
                            type="number"
                            id="mark"
                            name="mark"
                            value={mark}
                            onChange={(e) => setMark(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Select Status</option>
                            <option value="Correct">Correct</option>
                            <option value="Wrong">Wrong</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <button className="add-exam-button primary" type="submit">
                            Save
                        </button>
                    </div>

                    <div className="form-group">
                        <Link to="/addquestion">
                            <button className="add-exam-button secondary">
                                Add Question
                            </button>
                        </Link>
                    </div>

                    <div className="form-group">
                        <button className="add-exam-button danger" type="">
                            Publish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddAnswers
