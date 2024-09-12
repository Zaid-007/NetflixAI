import React from 'react';
import AiSearchBar from './AiSearchBar';
import { BACKGROUND_IMAGE } from '../utils/constants';
import Header from './Header';
import AiMovieSuggestions from './AiMovieSuggestions';
import {
  removeSearchMovieResults,
  searchButtonClicked,
} from '../utils/groqSlice';
import { useDispatch } from 'react-redux';

const AiSearch = () => {
  const dispatch = useDispatch();

  //Clearing the search movie results
  dispatch(removeSearchMovieResults());
  dispatch(searchButtonClicked(false));

  return (
    <div>
      <img
        className="w-full h-full object-cover fixed -z-[1]"
        src={BACKGROUND_IMAGE}
        alt="Background Image Login Screen"
      />
      <Header />
      <AiSearchBar />
      <AiMovieSuggestions />
    </div>
  );
};

export default AiSearch;
