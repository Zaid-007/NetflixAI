import React, { useRef } from 'react';
import client from '../utils/groq';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addSearchMovieResult, searchButtonClicked } from '../utils/groqSlice';

const AiSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movie +
        '&include_adult=false&language=en-US&page=1',
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };

  const handleSearchClick = async () => {
    dispatch(searchButtonClicked(true));

    // Make an API call to GPT API and get Movie Results
    const groqQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query :'" +
      searchText.current.value +
      "'. The result should only contain names of 5 movies, comma seperated like the example given ahead. 'Example: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya'. Only include the 5 movie names and dont add any instructions or sentences";

    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: groqQuery }],
      model: 'llama-3.1-70b-versatile',
    });

    const movieList = chatCompletion.choices[0].message.content.split(',');

    const promiseArray = movieList.map((movie) => searchMovieTmdb(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addSearchMovieResult({ movieNames: movieList, movieResults: tmdbResults })
    );
  };

  return (
    <div className="sm:pt-[10%] flex justify-center">
      <form
        className="w-full sm:w-1/2 p-4 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="mr-4 p-2 sm:p-4 col-span-9 h-12"
          type="text"
          placeholder="What would you like to watch today?"
        />
        <button
          onClick={handleSearchClick}
          className="py-2 px-4 col-span-3 bg-red-700 font-medium text-white rounded-md"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default AiSearchBar;
