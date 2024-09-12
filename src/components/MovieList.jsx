import React from 'react';
import { IMAGE_CDN_URL } from '../utils/constants';

const MovieList = ({ title, movies }) => {
  return (
    <div>
      <h1 className="text-white text-xl sm:text-2xl py-4">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar snap-mandatory snap-x">
        <div className="flex gap-x-4">
          {movies?.map((movie) => {
            if (!movie.poster_path) return null;
            return (
              <img
                key={movie.id}
                className="w-40 sm:w-48 rounded-md snap-start duration-200 hover:scale-90"
                src={IMAGE_CDN_URL + movie.poster_path}
                alt={movie.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
