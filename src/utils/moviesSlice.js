import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    nowPlayingMovies: null,
    movieLogo: null,
    teaserVideo: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addMovieLogo: (state, action) => {
      state.movieLogo = action.payload;
    },
    addTeaserVideo: (state, action) => {
      state.teaserVideo = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addMovieLogo, addTeaserVideo } =
  moviesSlice.actions;
export default moviesSlice.reducer;
