/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Card from "../components/Card";

const Favorites = ({ favorites, onRemoveFavorite, onShowDetail }) => {
  return (
    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
      {favorites.map((movie) => (
        <Card
          key={movie.id}
          movie={movie}
          onRemoveFavorite={onRemoveFavorite}
          onShowDetail={onShowDetail}
        />
      ))}
    </div>
  );
};

export default Favorites;
