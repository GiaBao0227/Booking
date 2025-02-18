import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovie, fetchShowtimesByMovie } from "./slice";

export default function DetailMoviePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, showtimes, loading } = useSelector(
    (state) => state.detailMovieReducer
  );
  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    dispatch(fetchDetailMovie(id));
    dispatch(fetchShowtimesByMovie(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No movie data found.</p>;

  return (
    <div>
      {/* Movie Info Row */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
        {/* Movie Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={data.hinhAnh}
            alt={data.tenPhim}
            className="w-64 h-auto rounded-lg shadow-md"
          />
        </div>
        {/* Movie Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{data.tenPhim}</h1>
          <p>
            <strong>Thể loại:</strong> {data.theLoai}
          </p>
          <p>
            <strong>Thời lượng:</strong> {data.thoiLuong} phút
          </p>
          <p>
            <strong>Ngày khởi chiếu:</strong>{" "}
            {new Date(data.ngayKhoiChieu).toLocaleDateString()}
          </p>
          <p>
            <strong>Mô tả:</strong>
          </p>
          <p className="whitespace-pre-line">{data.moTa}</p>
        </div>
      </div>

      {/* Cinema Selection as Tabs */}
      <h2 className="text-2xl font-semibold mb-3">Chọn rạp chiếu</h2>
      <div className="border-b mb-4 flex overflow-x-auto">
        {showtimes?.heThongRapChieu?.length > 0 ? (
          showtimes.heThongRapChieu.map((system) =>
            system.cumRapChieu.map((cinema) => (
              <button
                key={cinema.maCumRap}
                onClick={() => setSelectedCinema(cinema)}
                className={`px-4 py-2 transition-all ${
                  selectedCinema?.maCumRap === cinema.maCumRap
                    ? "border-b-2 border-blue-500"
                    : "hover:text-blue-400"
                }`}
              >
                {cinema.tenCumRap}
              </button>
            ))
          )
        ) : (
          <p className="text-gray-400">Không có lịch chiếu.</p>
        )}
      </div>
      {selectedCinema && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Lịch chiếu</h2>
          <div className="flex flex-wrap gap-3">
            {selectedCinema.lichChieuPhim.map((showtime) => (
              <button
                key={showtime.maLichChieu}
                onClick={() =>
                  navigate(
                    `/booking/${showtime.maLichChieu}`
                  )
                }
                className="bg-green-600 hover:bg-green-700 transition-all text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <span>
                  {new Date(showtime.ngayChieuGioChieu).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <i className="fas fa-clock"></i> {/* Example icon */}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
