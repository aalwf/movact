/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Card from "../components/Card";

// eslint-disable-next-line react/prop-types
const Home = ({ movies, onAddFavorite, onShowDetail }) => {
  return (
    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
      {movies.length === 0 ? (
        <p className="text-gray-500">No movies found. Please search for movies.</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.id}>
            <Card movie={movie} onAddFavorite={onAddFavorite} onShowDetail={onShowDetail} />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
