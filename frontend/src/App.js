import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentHome from "./pages/StudentHome";
import TeacherHome from "./pages/TeacherHome";
import UpdateTeacherExam from "./pages/UpdateTeacherExam";
import AddExam from "./pages/AddExam";
import AddQuestion from "./pages/AddQuestion";
import AddAnswers from "./pages/AddAnswers";
import StudentExamView from "./pages/StudentExamView";
import SingleExamView from "./pages/SingleExam";
import AnswersForQuestion from "./pages/AnswersForQuestion";
import ExamResult from "./pages/ExamResult";
import ViewExamTeacher from "./pages/ViewExamTeacher";
import QuestionView from "./pages/QuestionView";
import StudentNavBar from './components/StudentNavBar';
import TeacherNavBar from './components/TeacherNavBar';



function App() {

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setUserRole(localStorage.getItem('role')  ? localStorage.getItem('role') : "");
    //alert("alert 01" + userRole)

  })

  const handleBeforeUnload = () => {
    // Clear the user data from localStorage when the browser is closed
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
  };



  return (
    <div className="App">
      <Router>

        {userRole === 'Student' && <StudentNavBar />}
        {userRole === 'Teacher' && <TeacherNavBar />}

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/studenthome" component={StudentHome} />
          <Route path="/teacherhome" component={TeacherHome} />
          <Route path="/updateviewexam/:paperId" component={UpdateTeacherExam} />
          <Route path="/viewexamteacher" component={ViewExamTeacher} />
          <Route path="/addexam" component={AddExam} />
          <Route path="/addquestion" component={AddQuestion} />
          <Route path="/addanswers" component={AddAnswers} />
          <Route path="/studentexamview" component={StudentExamView} />
          <Route path="/single-exam/:paperId" component={SingleExamView} />
          <Route path="/answers-question/:paperId/:questionId" component={AnswersForQuestion} />
          <Route path="/examresult/:paperId" component={ExamResult} />
          <Route path="/questionview/:paperId" component={QuestionView} />


          <Route
            path="/"
            render={(props) => <Login {...props} setUserRole={setUserRole} />}
          /> 

        </Switch>
      </Router>
    </div>
  );
}

export default App;




