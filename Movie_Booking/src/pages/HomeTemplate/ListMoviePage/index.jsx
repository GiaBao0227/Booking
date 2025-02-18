import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListMovie } from "./slice";
import Banner from "../Banner/Banner"; // Đúng đường dẫn
import Movie from "./Movie";
import ShowtimesMovies from "../ShowtimesMovies/ShowtimesMovies";

export default function ListMoviePage() {
  const state = useSelector((state) => state.listMoviePageReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListMovie()); 
  }, []);

  console.log(state);

  const renderListMovie = () => {
    return state.data?.map((movie) => (
      <Movie key={movie.maPhim} movie={movie} />
    ));
  };

  return (
    <div className="container mx-auto px-4">
      {/* Banner */}
      <Banner />
      <h1 className="text-2xl font-bold mb-5 text-center">Showing Movies</h1>

      {/* Danh sách phim */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {renderListMovie()}
      </div>
      <ShowtimesMovies />
    </div>
  );
}
