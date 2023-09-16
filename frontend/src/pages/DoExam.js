import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/DoExam.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function DoExam() {

    const { paperId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [duration, setDuration] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);


    const history = useHistory();
    const timerRef = useRef(null);

    // Fetch questions for the paperId
    useEffect(() => {

        axios.get(`http://localhost:5001/questions/${paperId}`, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        })
            .then((response) => {
                setQuestions(response.data);

            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    useEffect(() => {

        axios.get(`http://localhost:5001/paper/byId/${paperId}`, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        })
            .then((response) => {

                const durationInSeconds = response.data.duration * 60 * 60; // Convert hours to seconds
                setDuration(durationInSeconds);
                setTimeLeft(durationInSeconds);
                console.log("Duration : ", durationInSeconds);

            })
            .catch((error) => {
                console.error('Error fetching paper:', error);
            });
    }, []);

    // Fetch answers for the current question
    useEffect(() => {
        const questionId = questions[currentQuestionIndex]?.questionId;
        if (questionId) {
            axios.get(`http://localhost:5001/answers/${questionId}`, {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                }
            })
                .then((response) => {
                    // Handle the response to get answer options
                    // Update the state with the fetched answers
                    setAnswers(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching answers:', error);
                });
        }
    }, [questions, currentQuestionIndex]);

    useEffect(() => {
        if (duration !== null) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);
        }
    }, [duration]);

    // Finish the paper when the time is up
    useEffect(() => {
        if (timeLeft === 0) {
            clearInterval(timerRef.current);
            handleFinishPaper();
        }
    }, [timeLeft]);

    // Function to format time as "hours:minutes:seconds"
    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours}:${minutes}:${seconds}`;
    };


    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Handle selecting an answer
    const handleSelectAnswer = (answerId) => {
        setSelectedAnswer(answerId);
    };

    // Handle submitting the selected answer
    const handleSubmitAnswer = () => {
        // Check if an answer is selected
        if (selectedAnswer !== null) {
            // Get the current question
            const currentQuestion = questions[currentQuestionIndex];

            // Find the selected answer from the answers array
            const selectedAnswerObj = answers.find(answer => answer.answerId === selectedAnswer);
            console.log(selectedAnswerObj.status)

            // Check if the selected answer is correct
            if (selectedAnswerObj.status === 'Correct') {
                // If it's correct, add 5 points to the points column
                axios.post('http://localhost:5001/studentanswer', {
                    paperId,
                    questionId: currentQuestion.questionId,
                    answerId: selectedAnswer,
                    points: 5, // Add 5 points for correct answer
                    status: 'Correct' // Set status to 'Correct'
                }, {
                    headers: {
                        Authorization: localStorage.getItem('accessToken')
                    }
                })
                    .then((response) => {
                        console.log("Success : ", response);
                    })
                    .catch((error) => {
                        console.error('Error posting answer:', error);
                    });

                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);

                } else {

                    setAllQuestionsAnswered(true);
                }

            } else {
                // If it's wrong, add 0 points to the points column
                axios.post('http://localhost:5001/studentanswer', {
                    paperId,
                    questionId: currentQuestion.questionId,
                    answerId: selectedAnswer,
                    points: 0, // Add 0 points for wrong answer
                    status: 'Wrong' // Set status to 'Wrong'
                }, {
                    headers: {
                        Authorization: localStorage.getItem('accessToken')
                    }
                }).then((response) => {
                    console.log("Success : ", response);
                }).catch((error) => {
                    console.error('Error posting answer:', error);
                });

                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);

                } else {

                    setAllQuestionsAnswered(true);
                }
            }
        } else {

            alert('Select answer');

        }
    };


    const handleFinishPaper = () => {

        const data = {
            paperId: paperId,
            progressStatus: 'Complete',
        };

        axios.put(`http://localhost:5001/stdpaper/${paperId}`, data, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
            }
        })
            .then(response => {
                console.log('Paper marked as complete:', response.data);
            })
            .catch(error => {
                console.error('Error marking paper as complete:', error);
            });

        clearInterval(timerRef.current);
        history.push(`/examresult/${paperId}`)
    };

    return (
        <div style={{ backgroundColor: "" }}>
            <div style={{ width: "250px", backgroundColor: "", marginTop: "2%", marginLeft: "2%", fontSize: "20px", fontFamily: "serif" }}>
                {duration !== null && (
                    <div className="duration">
                        Time Remaining: {formatTime(timeLeft)}
                    </div>
                )}
            </div>
            <div style={{ marginTop: "10%", width: "100%", backgroundColor: "", border: "1px solid black", borderRadius:"15px"}} className="container">
                <div className="row justify-content-center">
                    <div style={{}} className="col-md-16">

                        {allQuestionsAnswered ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <p style={{ fontSize: "40px", fontFamily: "initial", backgroundColor: "" }}>
                                    All are Done!
                                </p>
                            </div>
                        ) : (
                            <>

                                <div className="question mb-4">
                                    <p style={{ fontSize: "40px", fontFamily: "initial" }}>
                                        Question {currentQuestionIndex + 1}:{questions[currentQuestionIndex]?.question}
                                    </p>
                                </div>
                                <div style={{ fontSize: "20px", cursor: "pointer" }} className="answer">
                                    {answers.map((answer) => (
                                        <div className="form-check" key={answer.answerId}>
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="answer"
                                                value={answer.answerId}
                                                onChange={() => handleSelectAnswer(answer.answerId)}
                                                checked={selectedAnswer === answer.answerId}
                                            />
                                            <label className="form-check-label">{answer.answer}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-center">
                                    <button className="btn btn-primary custom-width mr-3" onClick={handlePrevious}>Previous</button>
                                    <button className="btn btn-success custom-width ml-3" onClick={handleSubmitAnswer}>Submit Answer</button>
                                </div>
                            </>
                        )}
                        <div className="mt-4 text-center">
                            <button className="btn btn-danger custom-width" onClick={handleFinishPaper}>Finish Paper</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DoExam;