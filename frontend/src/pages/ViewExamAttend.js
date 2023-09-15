import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import '../css/viewexamattend.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewExamAttend() {

  const [studentCount, setStudentCount] = useState('');
  const [total, setTotalCount] = useState('');
  const [names, setNames] = useState([]);
  const [status, setStatus] = useState([]);

  const { paperId } = useParams();
  const { subject } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Fetch student id, sending paperId as a URL parameter
    axios.get(`http://localhost:5001/stdpaper/studentCount/${paperId}`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => {
        console.log("student count: ", response.data.studentCount);
        setStudentCount(response.data.studentCount);
      })
      .catch(error => {
        console.error('Error fetching paper data:', error);
      });
  }, [paperId]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Fetch student id, sending paperId as a URL parameter
    axios.get(`http://localhost:5001/stdpaper/${paperId}`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => {
        console.log("student count: ", response.data);
      })
      .catch(error => {
        console.error('Error fetching paper data:', error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Fetch student id, sending paperId as a URL parameter
    axios.get(`http://localhost:5001/student/total`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => {
        console.log("total count: ", response.data.count);
        setTotalCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching paper data:', error);
      });
  }, [paperId]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Fetch student id, sending paperId as a URL parameter
    axios.get(`http://localhost:5001/stdpaper/${paperId}`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => {
        console.log("names: ", response.data);
        setNames(response.data);
      })
      .catch(error => {
        console.error('Error fetching paper data:', error);
      });
  }, [paperId]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Fetch student id, sending paperId as a URL parameter
    axios.get(`http://localhost:5001/stdpaper/status/${paperId}`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => {
        console.log("status: ", response.data);
        setStatus(response.data);
      })
      .catch(error => {
        console.error('Error fetching paper data:', error);
      });
  }, [paperId]);


  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1 className="display-4">{subject}</h1>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div style={{alignItems:"center", backgroundColor:"rgba(51,51,51,255)"}}className="alert">
                <h4 className="alert-heading">Student Count</h4>
                <p style={{fontSize:"80px"}} className="lead">{studentCount} / {total}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2 className="mb-3">Attending Student List</h2>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {names.map((name, index) => (
                    <tr key={index}>
                      <td>{name.name}</td>
                      <td
                        className={`${
                          status[index] && status[index].progressStatus === 'Complete'
                            ? 'text-success'
                            : 'text-danger'
                        }`}
                      >
                        {status[index] ? status[index].progressStatus : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewExamAttend;
