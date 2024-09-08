import React from 'react';
import useMovieTrailer from '../hooks/useMovieTrailer';
import { useSelector } from 'react-redux';

const VideoBackground = ({ id }) => {
  const trailer = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(id);

  return (
    <div className="w-full">
      <iframe
        className="w-full aspect-video"
        src={
          'https://www.youtube.com/embed/' +
          trailer?.key +
          '?autoplay=1&mute=1&controls=0&disablekb=1&playlist=' +
          trailer?.key +
          '&loop=1'
        }
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
