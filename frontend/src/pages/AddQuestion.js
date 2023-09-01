
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/addquestions.css';
import '../css/add-exam.css';


function AddQuestion() {
  const history = useHistory();

  const [paperId, setPaperId] = useState('');
  const [questionNo, setQuestionNo] = useState('');
  const [question, setQuestion] = useState('');

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

  const handleSubmit = async (event) => {

    const token = localStorage.getItem('accessToken');

    event.preventDefault();

    const newQuestion = {
      paperId,
      questionNo,
      question,
    };

    try {
      await axios.post('http://localhost:5001/questions', newQuestion, {
        headers: {
            Authorization: `${token}`
        }
      });
      
      console.log('Question added successfully');

      history.push(`/addanswers/`);

    } catch (error) {
      console.error('Error adding Question:', error);
    }
  };



  return (
    <div className="add-exam-container">
      <div className="add-exam-card">
        <h2>ADD QUESTIONS</h2>
        <form className="exam-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="paperId">Paper ID:</label>
            <input
              type="text"
              id="paperId"
              name="paperId"
              value={paperId}
              onChange={(e) => setPaperId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="questionNo">Question No:</label>
            <input
              type="number"
              id="questionNo"
              name="questionNo"
              value={questionNo}
              onChange={(e) => setQuestionNo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <br/>

          <div className="form-group">
            <button className="add-exam-button primary" type="submit" onClick={handleSubmit}>
              Add Answers
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestion;
