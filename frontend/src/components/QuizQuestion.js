// src/components/QuizQuestion.js
import React from 'react';
import './QuizQuestions.css'; // Import the QuizQuestion.css file

const QuizQuestion = ({
  question,
  options,
  selectedOption,
  onOptionSelect,
  isLastQuestion,
  isFirstQuestion,
}) => {
  const handleOptionChange = (e) => {
    onOptionSelect(parseInt(e.target.value, 10));
  };

  return (
    <div className="quiz-question">
      <h3>{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                value={index}
                checked={selectedOption === index}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestion;
