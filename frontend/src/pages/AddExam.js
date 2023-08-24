import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function AddExam() {
  const history = useHistory();

  const [subject, setSubject] = useState('');
  const [alloctedMarks, setAllocatedMarks] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paper = {
      subject,
      alloctedMarks,
      duration,
      status: 'Draft',
      date,
    };

    console.log('Submitting paper:', paper);

    try {

      const accessToken = localStorage.getItem('accessToken'); // Fetch the token from localStorage
      const response = await axios.post('http://localhost:5001/paper', paper, {
        headers: {
          accessToken: accessToken, // Include the token in the headers
        },
      });

      console.log('Response from backend:', response.data);
      console.log('Exam added successfully');
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  const AddQuestions = async () => {
    try {
      console.log('Exam added successfully');

      history.push(`/addquestion/`);
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };



  return (
    <div className="add-exam-container">
      <h2>Add Exam</h2>
      <form className="exam-form" onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <br />

        <label htmlFor="alloctedMarks">Allocated Marks:</label>
        <input
          type="text"
          id="alloctedMarks"
          name="alloctedMarks"
          value={alloctedMarks}
          onChange={(e) => setAllocatedMarks(e.target.value)}
        />
        <br />

        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <br />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />

       {/*  <button className="add-exam-button" type="submit">
          Save
        </button> */}

        <br />

        {<button className="add-exam-button" type="button" onClick={AddQuestions}>
          Add Questions
        </button>}

        <br />



        <br />

      </form>
    </div>
  );
}

export default AddExam;

