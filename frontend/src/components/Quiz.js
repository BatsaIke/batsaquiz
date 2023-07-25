import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizQuestionsAsync, selectQuizQuestions } from './features/quiz/quizSlice';
import QuizQuestion from './QuizQuestion';
import './Quiz.css'; // Import the Quiz.css file for styling

const Quiz = () => {
  const dispatch = useDispatch();
  const quizQuestions = useSelector(selectQuizQuestions);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(new Array(10).fill(null));
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  useEffect(() => {
    dispatch(fetchQuizQuestionsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (quizQuestions.length > 0) {
      // Create a copy of the quizQuestions array and then randomly select 10 questions from it
      const copiedQuestions = [...quizQuestions];
      const randomQuestions = copiedQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
        .map((question, index) => ({
          ...question,
          question: `${index + 1}. ${question.question}`, // Add question numbers (1, 2, 3...) to the question
        }));
      setCurrentQuestions(randomQuestions);
    }
  }, [quizQuestions]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptions((prevSelectedOptions) => [
      ...prevSelectedOptions.slice(0, currentQuestionIndex),
      optionIndex,
      ...prevSelectedOptions.slice(currentQuestionIndex + 1),
    ]);

    // Set isOptionSelected to true when an option is clicked
    setIsOptionSelected(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < currentQuestions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsOptionSelected(false); // Reset isOptionSelected for the next question
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleShowResults = () => {
    setIsQuizCompleted(true);
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions(new Array(10).fill(null));
    setIsQuizCompleted(false);
    setIsOptionSelected(false); // Reset isOptionSelected when quiz is reset
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Calculate total score when the quiz is completed
  const totalScore = isQuizCompleted
    ? selectedOptions.reduce((total, optionIndex, index) => {
        const correctOptionIndex = currentQuestions[index]?.correctOption;
        return total + (optionIndex === correctOptionIndex ? 1 : 0);
      }, 0)
    : 0;

  return (
    <div className="quiz-container">
      {quizQuestions.length > 0 ? (
        currentQuestion ? (
          <QuizQuestion
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedOption={selectedOptions[currentQuestionIndex]}
            onOptionSelect={handleOptionSelect}
            onNextQuestion={handleNextQuestion}
            onPreviousQuestion={handlePreviousQuestion}
            isLastQuestion={currentQuestionIndex === currentQuestions.length - 1}
            isFirstQuestion={currentQuestionIndex === 0}
          />
        ) : (
          <div>No more questions!</div>
        )
      ) : (
        <div>Loading...</div>
      )}

      {!isQuizCompleted && isOptionSelected && (
        <div className="quiz-button-container">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0 || selectedOptions[currentQuestionIndex] === null}
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === currentQuestions.length - 1 || selectedOptions[currentQuestionIndex] === null}
          >
            {currentQuestionIndex === currentQuestions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      )}

      {isQuizCompleted ? (
        <div>
          <h3>Quiz Completed!</h3>
          <p>Total Score: {totalScore}</p>
          <button onClick={handleResetQuiz}>Start Over</button>
        </div>
      ) : (
        isOptionSelected && !isQuizCompleted && (
          <div className="quiz-button-container">
            <button
              onClick={handleShowResults}
              disabled={selectedOptions.includes(null)}
            >
              Show Results
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;
