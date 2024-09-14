import React from 'react';
import { IMAGE_CDN_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

const MovieList = ({ title, movies }) => {
  return (
    <div>
      <h1 className="text-white text-xl sm:text-2xl py-4">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar scroll-smooth snap-x">
        <div className="flex gap-x-4 mb-4">
          {movies?.map((movie) => {
            if (!movie.poster_path) return null;
            return (
              <div key={movie.id} className="w-40 sm:w-48">
                <Link to={'/title/' + movie.id}>
                  <img
                    className="rounded-md snap-start duration-200 sm:hover:scale-90"
                    src={IMAGE_CDN_URL + movie.poster_path}
                    alt={movie.title}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
