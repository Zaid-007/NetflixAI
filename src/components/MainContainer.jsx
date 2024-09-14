import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;

  // const mainMovie = movies[Math.floor(Math.random() * movies.length)];
  const mainMovie = movies[0];

  const { title, overview, id } = mainMovie;

  return (
    <div className="sm:-mt-[160px] z-10 bg-black">
      <VideoBackground id={id} />
      <VideoTitle title={title} overview={overview} id={id} />
    </div>
  );
};

export default MainContainer;
