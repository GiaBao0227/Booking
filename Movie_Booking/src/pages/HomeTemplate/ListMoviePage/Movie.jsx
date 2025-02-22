import React from "react";
import { Link } from "react-router-dom";

export default function Movie({ movie }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative group">
      {/* Ảnh phim */}
      <img
        className="w-full h-[500px] object-cover rounded-t-lg"
        src={movie.hinhAnh}
        alt="Movie Image"
      />

      {/* Nội dung phim */}
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {movie.tenPhim}
        </h5>
      </div>

      {/* Hiệu ứng hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link
          to={`/detail/${movie.maPhim}`}
          className="mb-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Xem Chi Tiết
        </Link>
        <Link
          to={`/buy-ticket/${movie.maPhim}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Mua Vé
        </Link>
      </div>
    </div>
  );
}
