// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import DetailModal from "./components/DetailModal";
import ConfirmModal from "./components/ConfirmModal";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [alert, setAlert] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000); // Menghilangkan alert setelah 5 detik
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSearch = async (searchTerm) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=9017f81c393c2625acf48b176a33f684&query=${searchTerm}`;
    const response = await axios.get(url);
    setMovies(response.data.results);
  };

  const handleAddFavorite = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      const newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setAlert({ type: "success", message: "Movie added to favorites!" });
    } else {
      setAlert({ type: "danger", message: "Movie already in favorites!" });
    }
  };

  const handleRemoveFavorite = (movieId) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setAlert({ type: "success", message: "Movie removed from favorites!" });
  };

  const handleShowDetail = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null);
  };

  const handleConfirmDelete = (movieId) => {
    setConfirmDelete(movieId);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleConfirmDeleteYes = () => {
    handleRemoveFavorite(confirmDelete);
    setConfirmDelete(null);
  };

  return (
    <Router>
      <div>
        <Navbar onSearch={handleSearch} />
        <main className="container mx-auto p-4">
          {alert && (
            <div id="alert-3" className={`flex items-center p-4 mb-4 rounded-lg ${alert.type === "success" ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"}`} role="alert">
              <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div className="ms-3 text-sm font-medium">
                {alert.message} <a href="/favorites" className="font-semibold underline hover:no-underline">Detail Favorites</a>.
              </div>
              <button type="button" className={`ms-auto -mx-1.5 -my-1.5 rounded-lg  p-1.5 ${alert.type === "success" ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"}} inline-flex items-center justify-center h-8 w-8`} onClick={() => setAlert(null)}>
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
          )}
          <Routes>
            <Route
              path="/"
              element={<Home movies={movies} onAddFavorite={handleAddFavorite} onShowDetail={handleShowDetail} />}
            />
            <Route
              path="/favorites"
              element={<Favorites favorites={favorites} onRemoveFavorite={handleConfirmDelete} onShowDetail={handleShowDetail} />}
            />
          </Routes>
        </main>
        {selectedMovie && <DetailModal movie={selectedMovie} onClose={handleCloseDetail} />}
        {confirmDelete && (
          <ConfirmModal
            message="Are you sure you want to remove this movie from your favorites?"
            onConfirm={handleConfirmDeleteYes}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
