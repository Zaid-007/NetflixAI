import { createSlice } from '@reduxjs/toolkit';

const groqSlice = createSlice({
  name: 'groq',
  initialState: {
    searchButtonClicked: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    searchButtonClicked: (state, action) => {
      state.searchButtonClicked = action.payload;
    },
    addSearchMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    removeSearchMovieResults: (state) => {
      state.movieNames = null;
      state.movieResults = null;
    },
  },
});

export const {
  addSearchMovieResult,
  searchButtonClicked,
  removeSearchMovieResults,
} = groqSlice.actions;
export default groqSlice.reducer;
