import React from 'react';
import GptSearchBar from './GptSearchBar';
import { BACKGROUND_IMAGE } from '../utils/constants';
import Header from './Header';

const GptSearch = () => {
  return (
    <div>
      <img
        className="w-full h-screen object-cover absolute -z-[1]"
        src={BACKGROUND_IMAGE}
        alt="Background Image Login Screen"
      />
      <Header />
      <GptSearchBar />
    </div>
  );
};

export default GptSearch;
