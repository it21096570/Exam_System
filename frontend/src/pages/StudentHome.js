import React from 'react'
import { Link } from 'react-router-dom';


function StudentHome() {
  return (
    <div>

      <h1>Student Home</h1>

      <Link to="/studentexamview">
          <button className="add-exam-button">View exam List</button>
        </Link>
      
    </div>
  )
}

export default StudentHome
