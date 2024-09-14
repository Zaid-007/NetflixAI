import React from 'react';
import AiSearchBar from '../../components/AiSearchBar';
import { BACKGROUND_IMAGE } from '../../utils/constants';
import Header from '../../components/Header';
import AiMovieSuggestions from '../../components/AiMovieSuggestions';
import {
  removeSearchMovieResults,
  searchButtonClicked,
} from '../../utils/groqSlice';
import { useDispatch } from 'react-redux';
import { removeMovieDetail } from '../../utils/moviesSlice';

const AiSearch = () => {
  const dispatch = useDispatch();

  //Clearing the search movie results
  dispatch(removeSearchMovieResults());
  dispatch(searchButtonClicked(false));
  dispatch(removeMovieDetail());

  return (
    <div className="pb-4">
      <img
        className="w-full h-full object-cover fixed -z-[1]"
        src={BACKGROUND_IMAGE}
        alt="Background Image"
      />

      <Header />
      <AiSearchBar />
      <AiMovieSuggestions />
    </div>
  );
};

export default AiSearch;
