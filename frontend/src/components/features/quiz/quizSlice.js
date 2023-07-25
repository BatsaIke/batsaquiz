// src/features/quiz/quizSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchQuizQuestions } from '../../api/quizApi';

const initialState = {
  quizQuestions: [],
  status: 'idle',
  error: null,
};

export const fetchQuizQuestionsAsync = createAsyncThunk(
  'quiz/fetchQuizQuestions',
  async () => {
    const response = await fetchQuizQuestions();
    return response;
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestionsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizQuestionsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quizQuestions = action.payload;
      })
      .addCase(fetchQuizQuestionsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectQuizQuestions = (state) => state.quiz.quizQuestions;
export const selectQuizStatus = (state) => state.quiz.status;
export const selectQuizError = (state) => state.quiz.error;

export default quizSlice.reducer;
