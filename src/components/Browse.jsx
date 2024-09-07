import React from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';

const Browse = () => {
  useNowPlayingMovies();
  return (
    <>
      <div>
        <Header />
        <MainContainer />
        {/* <div className="bg-red-500 w-screen h-96 -mt-[100px] z-20 absolute"></div> */}
      </div>
    </>
  );
};

export default Browse;
