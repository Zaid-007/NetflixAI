import React, { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addMovieLogo } from '../utils/moviesSlice';

const useMovieLogo = (movieId) => {
  const dispatch = useDispatch();

  const getMovieLogo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images`,
      API_OPTIONS
    );
    const json = await data.json();
    const filterLogos = json.logos.filter((logo) => logo.iso_639_1 === 'en');
    const logo = filterLogos.length ? filterLogos[0] : json.logos[0];
    dispatch(addMovieLogo(logo.file_path));
  };

  useEffect(() => {
    getMovieLogo();
  }, []);
};

export default useMovieLogo;
