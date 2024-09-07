import React, { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTeaserVideo } from '../utils/moviesSlice';

const useMovieTeaser = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === 'Teaser');
    const teaser = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTeaserVideo(teaser));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);

  return;
};

export default useMovieTeaser;
