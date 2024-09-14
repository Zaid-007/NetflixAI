import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  if (!movies.upcomingMovies) return;

  return (
    <div className="bg-black py-6 sm:pb-8">
      <div className="pl-6 sm:pl-16 relative z-10 -mt-4 sm:-mt-48">
        <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
        <MovieList title={'Popular'} movies={movies.popularMovies} />
        <MovieList title={'Top Rated'} movies={movies.topRatedMovies} />
        <MovieList title={'Upcoming'} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
