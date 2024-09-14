import React, { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addMovieDetail } from '../utils/moviesSlice';

const useMovieDetail = (movieId) => {
  const dispatch = useDispatch();

  const getMovieDetail = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images,credits`,
      API_OPTIONS
    );
    const json = await data.json();

    const title = json.title;
    const overview = json.overview;
    const runtime = json.runtime;
    const releaseDate = json.release_date;
    const cast = json.credits.cast.slice(0, 3).map((el) => el.name);
    const genres = json.genres.slice(0, 3).map((el) => el.name);

    const filterLogos = json.images.logos.filter(
      (image) => image.iso_639_1 === 'en'
    );
    const logo = filterLogos.length ? filterLogos[0] : json.images.logos[0];

    const filterBackdrop = json.images.backdrops.filter(
      (image) => image.iso_639_1 === null && image.height === 2160
    );
    const backdrop = filterBackdrop.length
      ? filterBackdrop[0]
      : json.images.backdrops[0];

    dispatch(
      addMovieDetail({
        title,
        overview,
        runtime,
        releaseDate,
        cast,
        genres,
        logo: logo?.file_path,
        backdrop: backdrop?.file_path,
      })
    );
  };

  useEffect(() => {
    getMovieDetail();
  }, []);
};

export default useMovieDetail;
