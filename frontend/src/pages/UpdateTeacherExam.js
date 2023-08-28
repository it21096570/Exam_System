import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function UpdateTeacherExam() {
    const { paperId } = useParams(); // Get the paperId from the URL

    console.log(paperId);

    const history = useHistory();

    const [subject, setSubject] = useState('');
    const [alloctedMarks, setAllocatedMarks] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        // Fetch the existing paper details using paperId
        axios.get(`http://localhost:5001/paper/byId/${paperId}`)
            .then(response => {
                const paperData = response.data;

                console.log(paperData);

                setSubject(paperData.subject);
                setAllocatedMarks(paperData.alloctedMarks);
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
            alloctedMarks,
            duration,
            date,
        };

        console.log('Updating paper:', updatedPaper);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.put(`http://localhost:5001/paper/${paperId}`, updatedPaper, {
                headers: {
                    accessToken: accessToken,
                },
            });

            console.log('Response from backend:', response.data);
            console.log('Exam updated successfully');
            alert('Exam updated successfully');
            history.push('/viewexamteacher'); // Redirect to the exam list after updating
        } catch (error) {
            console.error('Error updating exam:', error);
        }
    };

    const handlePublish = async (event, newStatus) => {
        event.preventDefault();
    
        const updatedPaper = {
            subject,
            alloctedMarks,
            duration,
            date,
            status: "Published", // Set the new status
        };
    
        console.log('Updating paper:', updatedPaper);
    
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.put(`http://localhost:5001/paper/${paperId}`, updatedPaper, {
                headers: {
                    accessToken: accessToken,
                },
            });
    
            console.log('Response from backend:', response.data);
            console.log('Exam updated successfully');
            alert('Exam updated successfully');
            history.push('/viewexamteacher'); // Redirect to the exam list after updating
        } catch (error) {
            console.error('Error updating exam:', error);
        }


    };
    

    return (
        <div className="update-exam-container">
            <h2>Update Exam</h2>
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

                

                <label htmlFor="duration">Duration:</label>
                <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <br />

                <label htmlFor="date">Saved Date:</label>
                <input
                    type="text"
                    id="date"
                    name="date"
                    value={date}
                    readOnly
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

                <button className="update-exam-button" type="submit">
                    Update
                </button>

                <br />

                <button className="update-exam-button" type="button" onClick={(e) => handlePublish(e, 'Publish')}>
                    Publish
                </button>

            </form>
        </div>
    );
}

export default UpdateTeacherExam
