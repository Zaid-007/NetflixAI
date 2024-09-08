import React from 'react';
import { IMAGE_CDN_URL } from '../utils/constants';

const MovieList = ({ title, movies }) => {
  return (
    <div>
      <h1 className="text-white text-2xl py-4">{title}</h1>
      <div className="flex overflow-x-scroll scroll-smooth no-scrollbar snap-mandatory snap-x">
        <div className="flex">
          {movies.map((movie) => (
            <div key={movie.id} className="w-40 pr-4 snap-start">
              <img src={IMAGE_CDN_URL + movie.poster_path} alt={movie.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
