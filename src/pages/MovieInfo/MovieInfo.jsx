import React from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IMAGE_CDN_URL } from '../../utils/constants';
import useMovieDetail from '../../hooks/useMovieDetail';

const MovieInfo = () => {
  const params = useParams();
  useMovieDetail(params.id);
  const movieDetail = useSelector((store) => store.movies?.movieDetail);

  return (
    <>
      <Header />
      {movieDetail && (
        <div className="bg-[#181818] min-h-full sm:-mt-14">
          <div className="z-10 ">
            <img
              className="w-full h-full sm:h-screen object-contain sm:object-cover sm:absolute"
              src={IMAGE_CDN_URL + movieDetail.backdrop}
            />
            <div className="sm:w-[55%] sm:h-screen pt-[12%] px-6 sm:px-16 relative bg-[#181818] sm:bg-transparent sm:bg-gradient-to-r sm:from-[#181818] sm:from-30% shadow-[0_35px_15px_55px_rgb(24,24,24)] sm:shadow-none">
              <div className="sm:w-[82%] text-white">
                {movieDetail.logo && (
                  <img
                    className="sm:w-3/5 pb-4"
                    src={IMAGE_CDN_URL + movieDetail.logo}
                  />
                )}
                <h1 className="pt-6 pb-4 font-medium text-2xl">
                  {movieDetail.title}
                </h1>
                <div className="flex gap-x-2 pb-4 text-sm sm:text-base text-white text-opacity-60">
                  <p>{movieDetail.releaseDate.substr(0, 4)}</p>|
                  <p>
                    {Math.floor(movieDetail.runtime / 60)}h{' '}
                    {movieDetail.runtime % 60}m
                  </p>
                  |<p>{movieDetail.genres.join(', ')}</p>
                </div>
                <p className="pb-4">{movieDetail.overview}</p>
                <p className="text-white text-opacity-60 pb-8">
                  Starring:{' '}
                  <span className="text-white">
                    {movieDetail.cast.join(', ')}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieInfo;
