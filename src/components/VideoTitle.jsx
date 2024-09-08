import React from 'react';
import useMovieLogo from '../hooks/useMovieLogo';
import { useSelector } from 'react-redux';
import { IoMdPlay } from 'react-icons/io';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IMAGE_CDN_URL } from '../utils/constants';

const VideoTitle = ({ title, overview, id }) => {
  const logo = useSelector((store) => store.movies?.movieLogo);
  useMovieLogo(id);

  return (
    <div className="pt-[60%] sm:pt-[20%] px-8 sm:px-16 absolute z-10 w-full aspect-video bg-gradient-to-r from-black">
      <img
        className="w-64 pb-4"
        src={IMAGE_CDN_URL + logo}
        alt={title + 'Logo'}
      />
      <p className="hidden sm:block w-3/6 text-sm text-white pb-4">
        {overview}
      </p>
      <button className="bg-white text-black font-semibold py-1.5 px-6 rounded-sm shadow-md hover:bg-opacity-80">
        <IoMdPlay className="-mt-1 mr-1 inline scale-150" /> Play
      </button>
      <button className="bg-gray-500 text-white font-semibold bg-opacity-50 py-1.5 px-6 mx-3 rounded-sm shadow-md">
        <IoMdInformationCircleOutline className="-mt-1 mr-1 inline scale-150" />{' '}
        More Info
      </button>
    </div>
  );
};

export default VideoTitle;
