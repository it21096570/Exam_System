import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddQuestion() {

  const [paperId, setpaperId] = useState('');
  const [questionNo, setquestionNo] = useState('');
  const [question, setquestion] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newQuestion = {
      paperId,
      questionNo,
      question,
    };
  
    try {
      await axios.post('http://localhost:5001/questions', newQuestion);
      console.log(newQuestion.questionNo);
      console.log('Question added successfully');
      console.log(newQuestion);
    } catch (error) {
      console.error('Error adding Question:', error);
    }
  };
  

  return (
    <div className="add-exam-container">
      <h2>Add Question</h2>
      <form className="exam-form" onSubmit={handleSubmit}>
        <label>
          Paper ID:
          <input
            type="text"
            name="paperId"
            value={paperId}
            onChange={(e) => setpaperId(e.target.value)}
          />
        </label>
        <br />

        <label>
          Question No:
          <input
            type="number"
            name="questionNo"
            value={questionNo}
            onChange={(e) => setquestionNo(e.target.value)}
          />
        </label>
        <br />

        <label>
          Question:
          <input
            type="text"
            name="question"
            value={question}
            onChange={(e) => setquestion(e.target.value)}
          />
        </label>

        <br />
        <button className="add-exam-button" type="submit">Save</button>
        <br />
        <Link to="/addanswers">
          <button className="add-exam-button">Add Answers</button>
        </Link>
        <br />
      </form>
    </div>
  );
}


export default AddQuestion
