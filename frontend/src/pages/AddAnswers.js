import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddAnswers() {

    const [questionId, setquestionId] = useState('');
    const [answer, setanswer] = useState('');
    const [mark, setmark] = useState('');
    const [status, setstatus] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        const newAnswer = {
            questionId,
            answer,
            mark,
            status,
        };

        try {
            await axios.post('http://localhost:5001/answers', newAnswer);
            console.log('Answer added successfully');
            console.log(newAnswer);
        } catch (error) {
            console.error('Error adding Question:', error);
        }
    };

    return (
        <div className="add-exam-container">
            <h2>Add Exam</h2>
            <form className="exam-form" onSubmit={handleSubmit}>
                <label>
                    Question ID:
                    <input
                        type="text"
                        name="questionId"
                        value={questionId}
                        onChange={(e) => setquestionId(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Answer:
                    <input
                        type="number"
                        name="answer"
                        value={answer}
                        onChange={(e) => setanswer(e.target.value)}
                    />
                </label>

                
                <br />

                <label>
                    Marks:
                    <input
                        type="number"
                        name="mark"
                        value={mark}
                        onChange={(e) => setmark(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    Status:
                    <select
                        name="status"
                        value={status}
                        onChange={(e) => setstatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="Correct">Correct</option>
                        <option value="Wrong">Wrong</option>
                    </select>
                </label>
                <br />

                <br />
                <button className="add-exam-button" type="submit">Save</button>
                <br />

                {/* <Link to={`/addquestion?paperId=${paperId}`}>
          <button className="add-exam-button" onClick={handleAddQuestions}>
            Add Questions
          </button>
        </Link> */}

                <Link to={`/addquestion`}>
                    <button className="add-exam-button">
                        Add Question
                    </button>
                </Link>

                <br />
                <button className="add-exam-button" type="">Publish</button>
            </form>
        </div>
    )
}

export default AddAnswers
