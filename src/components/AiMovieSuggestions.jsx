import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const AiMovieSuggestions = () => {
  const { searchButtonClicked, movieNames, movieResults } = useSelector(
    (store) => store.groq
  );

  return (
    <div className="w-4/5 px-8 my-4 mx-auto bg-black bg-opacity-90 text-white">
      {searchButtonClicked && !movieNames ? (
        <h1 className="text-2xl py-4 text-center">Loading...</h1>
      ) : null}
      {movieNames &&
        movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
    </div>
  );
};

export default AiMovieSuggestions;
