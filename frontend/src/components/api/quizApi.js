// src/api/quizApi.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Adjust the URL if the backend is running on a different port
});

export const fetchQuizQuestions = async () => {
  try {
    const response = await api.get('/quiz');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch quiz questions', error);
    throw error;
  }
};
