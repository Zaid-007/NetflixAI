import React, { useEffect } from 'react';
import Header from '../../components/Header';
import MainContainer from '../../components/MainContainer';
import SecondaryContainer from '../../components/SecondaryContainer';
import useNowPlayingMovies from '../../hooks/useNowPlayingMovies';
import usePopularMovies from '../../hooks/usePopularMovies';
import useTopRatedMovies from '../../hooks/useTopRatedMovies';
import useUpcomingMovies from '../../hooks/useUpcomingMovies';
import { removeMovieDetail } from '../../utils/moviesSlice';
import { useDispatch } from 'react-redux';

const Browse = () => {
  const dispatch = useDispatch();

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  useEffect(() => {
    //Clearing data of movie detail page
    dispatch(removeMovieDetail());
  }, []);

  return (
    <div className="bg-black">
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
