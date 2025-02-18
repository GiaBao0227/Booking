import { configureStore } from "@reduxjs/toolkit";
import listMoviePageReducer from "./../pages/HomeTemplate/ListMoviePage/slice";
import detailMovieReducer from "./../pages/HomeTemplate/DetailMovie/slice";
import authReducer from "./../pages/AdminTemplate/AuthPage/slice";
import bannerReducer from "./../pages/HomeTemplate/Banner/slice";
import bookingReducer from "./../pages/HomeTemplate/Booking/slice";
import showtimesReducer from "./../pages/HomeTemplate/ShowtimesMovies/slice";

export const store = configureStore({
  reducer: {
    listMoviePageReducer,
    detailMovieReducer,
    authReducer,
    bannerReducer,
    showtimesReducer,
    bookingReducer,
  },
});
