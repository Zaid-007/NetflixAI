import React from 'react';
import useMovieTeaser from '../hooks/useMovieTeaser';
import { useSelector } from 'react-redux';

const VideoBackground = ({ id }) => {
  const teaser = useSelector((store) => store.movies?.teaserVideo);
  useMovieTeaser(id);

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          'https://www.youtube.com/embed/' +
          teaser?.key +
          '?autoplay=1&mute=1&controls=0&disablekb=1&playlist=' +
          teaser?.key +
          '&loop=1'
        }
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
