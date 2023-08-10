import React, { useState } from 'react';
import axios from 'axios';

function AddExam() {
  const [subject, setSubject] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [allocatedMarks, setAllocatedMarks] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paper = {
      subject,
      teacherId,
      allocatedMarks,
      duration,
      status: 'Draft',
      date,
    };

    try {
      await axios.post('http://localhost:5001/paper', paper);
      console.log('Exam added successfully');
      console.log(paper);
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  return (
    <div className="add-exam-container">
      <h2>Add Exam</h2>
      <form className="exam-form" onSubmit={handleSubmit}>
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
        <br />

        <label>
          Teacher ID:
          <input
            type="text"
            name="teacherId"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          />
        </label>
        <br />

        <label>
          Allocated Marks:
          <input
            type="number"
            name="allocatedMarks"
            value={allocatedMarks}
            onChange={(e) => setAllocatedMarks(e.target.value)}
          />
        </label>
        <br />

        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <br />

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />

        <br />
        <button className="add-exam-button" type="submit">Save</button>
        <br />
        <a href="/addquestion"><button className="add-exam-button">Add Questions</button></a>
        <br />
        <button className="add-exam-button" type="">Publish</button>
      </form>
    </div>
  );
}

export default AddExam;
