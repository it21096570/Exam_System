/* import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function AddQuestion() {
  const history = useHistory();

  const [paperId, setPaperId] = useState('');
  const [questionNo, setQuestionNo] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newQuestion = {
      paperId,
      questionNo,
      question,
    };

    try {
      await axios.post('http://localhost:5001/questions', newQuestion);
      console.log('Question added successfully');
    } catch (error) {
      console.error('Error adding Question:', error);
    }
  };

  const AddAnswer = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:5001/questions',
        {
          paperId,
          questionNo,
          question,
        },
        {
          headers: {
            accessToken: accessToken,
          },
        }
      );

      const addedPaperId = response.data.paperId;
      console.log('Paper ID:', addedPaperId);
      console.log('Question added successfully');

      history.push(`/addanswers/`);

    } catch (error) {
      console.error('Error adding question:', error);
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
            onChange={(e) => setPaperId(e.target.value)}
          />
        </label>
        <br />

        <label>
          Question No:
          <input
            type="number"
            name="questionNo"
            value={questionNo}
            onChange={(e) => setQuestionNo(e.target.value)}
          />
        </label>
        <br />

        <label>
          Question:
          <input
            type="text"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <br />

        <button className="add-exam-button" type="submit">
          Save
        </button>
        <br />

        <button className="add-exam-button" type="button" onClick={AddAnswer}>
          Add Answers
        </button>
        <br />
      </form>
    </div>
  );
}

export default AddQuestion;
 */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function AddQuestion() {
  const history = useHistory();

  const [paperId, setPaperId] = useState('');
  const [questionNo, setQuestionNo] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    async function fetchLatestPaperId() {
      try {
        const response = await axios.get('http://localhost:5001/paper/latestPaperId');
        
        const latestPaperId = response.data.latestPaperId;

        console.log("Latest Paper ID:", latestPaperId);

        setPaperId(latestPaperId);

      } catch (error) {
        console.error('Error fetching latest Paper ID:', error);
      }
    }

    fetchLatestPaperId();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newQuestion = {
      paperId,
      questionNo,
      question,
    };

    try {
      await axios.post('http://localhost:5001/questions', newQuestion);
      console.log('Question added successfully');
    } catch (error) {
      console.error('Error adding Question:', error);
    }
  };

  const AddAnswer = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:5001/questions',
        {
          paperId,
          questionNo,
          question,
        },
        {
          headers: {
            accessToken: accessToken,
          },
        }
      );

      const addedPaperId = response.data.paperId;
      console.log('Paper ID:', addedPaperId);
      console.log('Question added successfully');

      history.push(`/addanswers/`);

    } catch (error) {
      console.error('Error adding question:', error);
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
            onChange={(e) => setPaperId(e.target.value)}
          />
        </label>
        <br />

        <label>
          Question No:
          <input
            type="number"
            name="questionNo"
            value={questionNo}
            onChange={(e) => setQuestionNo(e.target.value)}
          />
        </label>
        <br />

        <label>
          Question:
          <input
            type="text"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <br />

        <button className="add-exam-button" type="submit">
          Save
        </button>
        <br />

        <button className="add-exam-button" type="button" onClick={AddAnswer}>
          Add Answers
        </button>
        <br />
      </form>
    </div>
  );
}

export default AddQuestion;
