import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/UpdateTeacherExam.css';

function UpdateTeacherExam() {
    const { paperId } = useParams();
    const history = useHistory();

    const [subject, setSubject] = useState('');
    const [allocatedMarks, setAllocatedMarks] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get(`http://localhost:5001/paper/byId/${paperId}`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                const paperData = response.data;
                setSubject(paperData.subject);
                setAllocatedMarks(paperData.allocatedMarks);
                setDuration(paperData.duration);
                setDate(paperData.date);
            })
            .catch(error => {
                console.error('Error fetching paper details:', error);
            });
    }, [paperId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedPaper = {
            subject,
            allocatedMarks,
            duration,
            date,
        };

        try {
            const token = localStorage.getItem('accessToken');
            await axios.put(`http://localhost:5001/paper/${paperId}`, updatedPaper, {
                headers: {
                    Authorization: token
                }
            });
            alert('Exam updated successfully');
            history.push('/viewexamteacher');
        } catch (error) {
            console.error('Error updating exam:', error);
        }
    };

    const handlePublish = async (event) => {
        event.preventDefault();

        const updatedPaper = {
            subject,
            allocatedMarks,
            duration,
            date,
            status: 'Published',
        };

        try {
            const token = localStorage.getItem('accessToken');
            await axios.put(`http://localhost:5001/paper/${paperId}`, updatedPaper, {
                headers: {
                    Authorization: token
                }
            });
            alert('Exam updated and Published');
            history.push('/viewexamteacher');
        } catch (error) {
            console.error('Error updating exam:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="border-container">
                <h2 className="mb-4">Update Exam</h2>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="subject" className="form-label">Subject:</label>
                        <input
                            type="text"
                            id="subject"
                            className="form-control"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="duration" className="form-label">Duration:</label>
                        <input
                            type="text"
                            id="duration"
                            className="form-control"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="savedDate" className="form-label">Saved Date:</label>
                        <input
                            type="text"
                            id="savedDate"
                            className="form-control"
                            value={date}
                            readOnly
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="col-12 mt-4">
                        <button className="btn btn-primary me-3" type="submit">Update</button>
                        <button className="btn btn-success" type="button" onClick={handlePublish}>Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateTeacherExam;
