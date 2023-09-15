import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import '../css/questionview.css';


function QuestionView() {
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const { paperId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/questions/${paperId}`, {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        });
        console.log('Fetched questions:', response.data);
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
        if (questionId !== '') {
          const response = await axios.get(`http://localhost:5001/answers/${questionId}`, {
            headers: {
              Authorization: localStorage.getItem('accessToken'),
            },
          });

          console.log('Qid:', questionId);
          console.log('Fetched answers:', response.data);
          setAnswers(response.data);
        }
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (event) => {
    const { value } = event.target;
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = value;
    setSelectedAnswers(updatedAnswers);
  };



  const handleSubmitAnswer = async () => {
    const token = localStorage.getItem('accessToken');
    const submittedAnswers = [];
  
    try {
      for (let index = 0; index < questions.length; index++) {
        const answerId = selectedAnswers[index]; // Get the selected answerId
        const questionId = questions[index].questionId;
  
        const answerToSubmit = {
          paperId: paperId,
          questionId: questionId,
          answerId: answerId,
          points: 10, // You can set the points as needed
          answerStatus: 'answerStatus', // Replace with the actual answer status
        };
  
        // Make a POST request to submit the answer
        const response = await axios.post('http://localhost:5001/studentanswer', answerToSubmit, {
          headers: {
            Authorization: token,
          },
        });
  
        console.log(`Answer ${index + 1} submitted:`, response.data);
        submittedAnswers.push(response.data); // Store the submitted answer data
      }
  
      // Reset the selected answers after all answers are submitted
      setSelectedAnswers(Array(questions.length).fill(null));
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  
    const data = {
      paperId: paperId,
      progressStatus: 'Complete',
    };
  
    axios.put(`http://localhost:5001/stdpaper/${paperId}`, data, {
      headers: {
        Authorization: token,
      }
    })
      .then(response => {
        console.log('Paper marked as complete:', response.data);
      })
      .catch(error => {
        console.error('Error marking paper as complete:', error);
      });
  };
  


  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="question-container">
      <h2 className="question-header">Question {currentQuestionIndex + 1}</h2>
      <p className="question-text">{currentQuestion.question}</p>

      {answers && answers.map((answer, index) => (
        <label className="answer-label" key={index}>
          <input
            type="radio"
            name="selectedAnswer"
            value={answer.answer}
            checked={selectedAnswers[currentQuestionIndex] === answer.answer}
            onChange={handleAnswerChange}
          />
          {answer.answer}
        </label>
      ))}

      <div className="button-container">
        <button className="button previous-button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button className="button next-button" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
          Next
        </button>
        <button className="button submit-button" onClick={handleSubmitAnswer}>Submit Answer</button>
      </div>
    </div>
  );

}

export default QuestionView;

