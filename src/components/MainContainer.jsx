import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;

  // const mainMovie = movies[Math.floor(Math.random() * movies.length)];
  const mainMovie = movies[4];

  const { title, overview, id } = mainMovie;

  return (
    <div className="-mt-[160px] z-10">
      <VideoTitle title={title} overview={overview} id={id} />
      <VideoBackground id={id} />
    </div>
  );
};

export default MainContainer;
