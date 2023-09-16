import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import '../css/studentExamView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionView from './QuestionView'; 

function StudentExamView() {
  const [paperList, setPaperList] = useState([]);
  const [selectedPaperId, setSelectedPaperId] = useState(null); 
  const [studentId, setStudentId] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Fetch paper data
    axios.get('http://localhost:5001/paper', {
      headers: {
        Authorization: `${token}`
      }
    })
    .then(response => {
      console.log("Check Response: ", response.data);
      setPaperList(response.data);
    })
    .catch(error => {
      console.error('Error fetching paper data:', error);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Fetch student id
    axios.get('http://localhost:5001/paper/student', {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => {
        console.log("Check Response: ", response.data);
        setStudentId(response.data);
      })
      .catch(error => {
        console.error('Error fetching paper data:', error);
      });
  }, []);

  const handlePaperClick = (paperId, studentId) => {
    const token = localStorage.getItem('accessToken');

    // Set the selectedPaperId when a paper is clicked
    setSelectedPaperId(paperId);

    const data = {
      paperId: paperId,
      progressStatus: 'Not Complete',
    };

    axios.post('http://localhost:5001/stdpaper', data, {
      headers: {
        Authorization: `${token}`
      }
    })
    .then(response => {
      console.log('Done!:', response.data);
    })
    .catch(error => {
      console.error('Error saving student paper:', error);
    });

    history.push(`/doexam/${paperId}`);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">EXAM - LIST</h2>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card-columns">
            {paperList
              .filter(paper => paper.status !== 'Draft')
              .map((paper, index) => (
                <div
                  key={paper.paperId}
                  className="card card-clickable"
                  onClick={() => handlePaperClick(paper.paperId, studentId)}
                >
                  <div className="card-body">
                    <h5 className="card-title">{paper.subject}</h5>
                    <p className="card-text">Duration: {paper.duration} h</p>
                    <p className="card-text">Status: {paper.status}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {selectedPaperId && <QuestionView paperId={selectedPaperId} />}
    </div>
  );
}

export default StudentExamView;
