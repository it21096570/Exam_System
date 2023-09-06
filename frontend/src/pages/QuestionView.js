import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function QuestionView() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false); // Toggle to show/hide answer options
  const [questionId, setQuestionId] = useState([]);
  const { paperId } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/questions/${paperId}`, {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        });
        console.log('Fetched questions:', response.data); // Debugging statement
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [paperId]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/answers/${questionId}`, {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        });
        console.log('Fetched answers:', response.data); // Debugging statement
        setAnswers(response.data);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers();
  }, [questionId]);

  useEffect(() => {
    // Ensure that currentQuestion is valid before updating questionId
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      setQuestionId(questions[currentQuestionIndex].questionId);
    }
  }, [currentQuestionIndex, questions]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowAnswers(false); // Hide answer options when moving to the next question
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setShowAnswers(false); // Hide answer options when moving to the previous question
  };

  const handleAnswerChange = (event) => {
    const { name, value } = event.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleSubmitAnswer = async () => {
    // Your answer submission logic here...

    // Move to the next question
    handleNextQuestion();
  };

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];



  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.question}</p>

      {showAnswers && currentQuestion.optionsArray && (
        <div>
          {currentQuestion.optionsArray.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                name={`question_${currentQuestionIndex}`}
                value={option}
                onChange={handleAnswerChange}
                checked={answers[`question_${currentQuestionIndex}`] === option}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setShowAnswers(!showAnswers)}>
        {showAnswers ? 'Hide Answers' : 'Show Answers'}
      </button>

      <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
        Previous
      </button>
      <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
        Next
      </button>
      <button onClick={handleSubmitAnswer}>Submit Answer</button>
    </div>
  );
}

export default QuestionView;
