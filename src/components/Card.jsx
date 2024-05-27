/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Card = ({ movie, onAddFavorite, onRemoveFavorite, onShowDetail }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const handleAddFavorite = () => {
    onAddFavorite(movie);
    setIsFavorite(true);
  };

  const handleRemoveFavorite = () => {
    onRemoveFavorite(movie.id);
    setIsFavorite(false);
  };

  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800 group">
      <img src={imageUrl} alt={movie.title} className="w-32 bg-cover bg-no-repeat bg-center rounded-l rounded-r-3xl shadow-lg dark:border-r-2 dark:border-indigo-500"/>
      <div className="p-3 text-gray-800 dark:text-gray-300 w-8/12">
        <h1 className="text-xl truncate font-bold group-hover:text-indigo-500">
            {movie.title}
        </h1>
        <p className="mb-3 font-normal text-gray-800 dark:text-gray-400">
          {movie.popularity}
        </p>
        <div className="mt-10 flex justify-between">
          <button onClick={() => onShowDetail(movie)} className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded">Details</button>
          {isFavorite ? (
            <button
              onClick={handleRemoveFavorite}
              className="text-red-500 hover:text-red-700"
            >
              <FaHeart className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleAddFavorite}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaRegHeart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
