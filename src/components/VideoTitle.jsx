import React, { useState } from 'react';
import { IoMdPlay } from 'react-icons/io';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IMAGE_CDN_URL } from '../utils/constants';
import useMovieLogo from '../hooks/useMovieLogo';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VideoTitle = ({ title, overview, id }) => {
  const [toggleVideo, setToggleVideo] = useState(false);
  const trailer = useSelector((store) => store.movies?.trailerVideo);
  const logo = useSelector((store) => store.movies.movieLogo);
  useMovieLogo(id);

  const handleToggle = () => {
    setToggleVideo(!toggleVideo);
  };

  if (!logo) return;

  return (
    <>
      {toggleVideo && (
        <div
          onClick={handleToggle}
          className="flex justify-center items-center sm:mt-[104px] bg-black w-full h-full fixed z-20 opacity-95"
        >
          <iframe
            className="-mt-32 sm:-mt-0 w-11/12 sm:w-3/4 aspect-video z-30 relative"
            src={
              'https://www.youtube.com/embed/' +
              trailer?.key +
              '?autoplay=1&mute=1'
            }
            title="YouTube Video Player"
          ></iframe>
        </div>
      )}
      <div className="pt-[60%] sm:pt-[18%] px-6 sm:px-16 relative z-10 w-full aspect-video sm:bg-gradient-to-r sm:from-black">
        <img
          className="w-64 pb-4"
          src={IMAGE_CDN_URL + logo}
          alt={title + 'Logo'}
        />
        <p className="hidden sm:block w-2/5 text-sm text-white pb-4">
          {overview}
        </p>
        <button
          onClick={handleToggle}
          className="bg-white text-black font-semibold py-1.5 px-6 rounded-sm shadow-md hover:bg-opacity-80"
        >
          <IoMdPlay className="-mt-1 mr-1 inline scale-150" /> Play
        </button>
        <Link to={'/title/' + id}>
          <button className="bg-gray-500 text-white font-semibold bg-opacity-50 py-1.5 px-6 mx-3 rounded-sm shadow-md">
            <IoMdInformationCircleOutline className="-mt-1 mr-1 inline scale-150" />{' '}
            More Info
          </button>
        </Link>
      </div>
    </>
  );
};

export default VideoTitle;
