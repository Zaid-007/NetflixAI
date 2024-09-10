import React from 'react';

const GptSearchBar = () => {
  return (
    <div className="flex justify-center">
      <form className="w-1/2 p-4 bg-black grid grid-cols-12">
        <input
          className="mr-4 p-4 col-span-9 h-12"
          type="text"
          placeholder="What would you like to watch today?"
        />
        <button className="py-2 px-4 col-span-3 bg-red-700 font-medium text-white rounded-md">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
