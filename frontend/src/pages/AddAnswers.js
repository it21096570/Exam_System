import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/addanswers.css';


function AddAnswers() {
    const history = useHistory();


    const [paperId, setPaperId] = useState('');
    const [questionId, setQuestionId] = useState('');
    const [answer, setAnswer] = useState('');
    const [mark, setMark] = useState('');
    const [status, setStatus] = useState('');
    

    useEffect(() => {

        const token = localStorage.getItem('accessToken');
    
        async function fetchLatestPaperId() {
          try {
    
            const response = await axios.get('http://localhost:5001/paper/latestPaperId', {
              headers: {
                Authorization: `${token}`
            }
            });
    
            const latestPaperId = response.data.latestPaperId;
    
            console.log("Latest Paper ID --b :", latestPaperId);
    
            setPaperId(latestPaperId);
    
          } catch (error) {
            console.error('Error fetching latest Paper ID:', error);
          }
        }
    
        fetchLatestPaperId();
      }, []);


    useEffect(() => {
        
        const token = localStorage.getItem('accessToken');

        async function fetchLatestQuestionId() {
            try {
                const response = await axios.get('http://localhost:5001/paper/latestQuestionId', {
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
            alert('Answer added successfully');

        } catch (error) {
            console.error('Error adding Question:', error);
        }
    };

    const handleSubmitAAQ = async (event) => {

        
            history.push('/addquestion')

        
    };

    const handlePublish = async (event) => {
        event.preventDefault();

        const updatedPaper = {
            status: 'Published',
        };

        const newAnswer = {
            questionId,
            answer,
            mark,
            status,
        };

        try {
            const token = localStorage.getItem('accessToken');

            await axios.post('http://localhost:5001/answers', newAnswer, {
                headers: {
                    Authorization: `${token}`
                }
            });

            await axios.put(`http://localhost:5001/paper/${paperId}`, updatedPaper, {
                headers: {
                    Authorization: token
                }
            });
            alert('Answer Added and Paper Published');

        } catch (error) {
            console.error('Error updating exam:', error);
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
                        
                            <button className="add-exam-button secondary" onClick={handleSubmitAAQ}>
                                Add Another Question
                            </button>
                        
                    </div>

                    <div className="form-group">
                        <button className="add-exam-button danger" onClick={handlePublish}>
                            Publish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddAnswers
