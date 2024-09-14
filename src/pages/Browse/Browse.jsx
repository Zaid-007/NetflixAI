import React, { useEffect } from 'react';
import Header from '../../components/Header';
import MainContainer from '../../components/MainContainer';
import SecondaryContainer from '../../components/SecondaryContainer';
import useNowPlayingMovies from '../../hooks/useNowPlayingMovies';
import { removeMovieDetail } from '../../utils/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';

const Browse = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const dispatch = useDispatch();

  useNowPlayingMovies();

  useEffect(() => {
    //Clearing data of movie detail page
    dispatch(removeMovieDetail());
  }, []);

  return (
    movies && (
      <div className="bg-black">
        <Header />
        <MainContainer />
        <SecondaryContainer />
      </div>
    )
  );
};

export default Browse;
