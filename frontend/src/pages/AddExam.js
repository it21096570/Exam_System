import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/add-exam.css';

function AddExam() {
  const history = useHistory();

  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionNumber: 1, // Start with question number 1
      question: '',
      answers: ['', '', '', ''],
      correctAnswerIndex: 0, // Default to the first answer
    },
  ]);
  const [paperId, setPaperId] = useState(null); // State to store the paperId

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        questionNumber: prevQuestions.length + 1, // Auto-increment question number
        question: '',
        answers: ['', '', '', ''],
        correctAnswerIndex: 0,
      },
    ]);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('accessToken');

    try {
      // Step 1: Add exam details
      const examData = {
        subject,
        duration,
        date,
        status: 'Draft',
      };

      const examResponse = await axios.post('http://localhost:5001/paper', examData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // Check if the response contains a valid paperId
      if (examResponse.data && examResponse.data.paperId) {
        const createdPaperId = examResponse.data.paperId;
        setPaperId(createdPaperId); // Store the paperId in state

        console.log('Created Paper ID:', createdPaperId); // Log the created paperId

        // Step 2: Add questions and answers
        for (const questionData of questions) {
          const response = await axios.get('http://localhost:5001/paper/latestPaperId', {
          headers: {
            Authorization: `${token}`
        }
        });

        const latestPaperId = response.data.latestPaperId;

        console.log("Latest Paper ID --b :", latestPaperId);


          const questionResponse = await axios.post(
            'http://localhost:5001/questions',
            {
              paperId: createdPaperId, // Use the created paperId
              questionNo: questionData.questionNumber,
              question: questionData.question,
            },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          console.log('Question Response:', questionResponse.data); // Log the question response

          const qresponse = await axios.get('http://localhost:5001/paper/latestQuestionId', {
                    headers: {
                        Authorization: `${token}`
                    }
                });

                const latestQuestionId = qresponse.data.latestQuestionId;

                console.log("Latest Question ID:", latestQuestionId);


          // Create an array to store answer data for this question
          const answerDataArray = questionData.answers.map((answer, i) => ({
            questionId: latestQuestionId,
            answer,
            mark: i + 1, // Assign marks (1, 2, 3, 4) to answers
            status: i === questionData.correctAnswerIndex ? 'Correct' : 'Wrong',
          }));

          // Use Promise.all to send all answers for this question concurrently
          await Promise.all(
            answerDataArray.map(async (answerData) => {
              await axios.post('http://localhost:5001/answers', answerData, {
                headers: {
                  Authorization: `${token}`,
                },
              });
            })
          );
        }

        console.log('Exam, questions, and answers added successfully');
        history.push('/dashboard'); // Redirect to dashboard after adding everything
      } else {
        console.error('Invalid or missing paperId in the exam response:', examResponse);
      }
    } catch (error) {
      console.error('Error adding exam, questions, and answers:', error);
    }
  };

  return (
    <div className="add-exam-container">
      <div className="add-exam-card">
        <h2>ADD EXAM PAPER</h2>
        <form className="exam-form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (hours):</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {questions.map((question, index) => (
            <div key={index}>
              <div className="form-group">
                <label htmlFor={`question-${index}`}>Question {index + 1}:</label>
                <input
                  type="text"
                  id={`question-${index}`}
                  name={`question-${index}`}
                  value={question.question}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].question = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Answers:</label>
                {question.answers.map((answer, answerIndex) => (
                  <div key={answerIndex}>
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].answers[answerIndex] = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                    />
                    <label>
                      <input
                        type="radio"
                        name={`correct-answer-${index}`}
                        checked={question.correctAnswerIndex === answerIndex}
                        onChange={() => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].correctAnswerIndex = answerIndex;
                          setQuestions(updatedQuestions);
                        }}
                      />{' '}
                      Correct
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>

          <button className="add-exam-button primary" type="submit">
            Save Exam, Questions, and Answers
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExam;