// src/components/QuizModal.js
import React from 'react';
import Modal from 'react-modal';
import './QuizModal.css'; // Import the QuizModal.css file

Modal.setAppElement('#root'); // Set the root element for accessibility

const QuizModal = ({ isOpen, onClose }) => {
  return (
    <Modal className="quiz-modal" isOpen={isOpen} onRequestClose={onClose} contentLabel="Quiz Results">
      <div className="modal-content">
        <h2>Quiz Completed!</h2>
        <p>Congratulations! You have completed the quiz.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default QuizModal;
