import React from 'react';
import { Link } from 'react-router-dom';
import '../css/StudentNavBar.css';
function StudentNavBar() {

  const logOut = () => {
    localStorage.clear();

    window.location.href = '/';
  }

  return (
    <nav className="student-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
        </li>
        <li className="nav-item">
          <Link to="/studentexamview" className="nav-link">Exams</Link>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link" onClick={() => logOut()}>LogOut</button>
        </li>
      </ul>
    </nav>
  );
}

export default StudentNavBar;

