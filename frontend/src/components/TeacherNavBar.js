import React from 'react';
import { Link } from 'react-router-dom';
import '../css/TeacherNavBar.css';

function TeacherNavBar() {

  const logOut = () => {
    localStorage.clear();

    window.location.href = '/';
  }

  return (
    <nav className="teacher-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/viewexamteacher" className="nav-link">Exam List</Link>
        </li>
        <li className="nav-item">
          <Link to="/addexam" className="nav-link">Add New Exam</Link>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link" onClick={() => logOut()}>LogOut</button>
        </li>
      </ul>
    </nav>
  );
}

export default TeacherNavBar;
