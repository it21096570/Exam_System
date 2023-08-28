import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/add-exam.css'; // Import your custom styles
import 'bootstrap/dist/css/bootstrap.css';

function AddExam() {
  const history = useHistory();

  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paper = {
      subject,
      duration,
      status: 'Draft',
      date,
    };

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:5001/paper', paper, {
        headers: {
          accessToken: accessToken,
        },
      });

      console.log('Response from backend:', response.data);
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
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary add-exam-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddExam;
