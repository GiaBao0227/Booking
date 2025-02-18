import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShowtimes } from "./slice";
import { useNavigate } from "react-router-dom";

const systemColors = {
  BHDStar: "text-green-600",
  CGV: "text-red-600",
  CineStar: "text-purple-600",
  LotteCinema: "text-orange-600",
  GalaxyCinema: "text-yellow-600",
  MegaGS: "text-blue-600",
};

const ShowtimesMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cinemaSystems = [], loading } =
    useSelector((state) => state.showtimesReducer) || {};
  const [selectedSystem, setSelectedSystem] = useState("");
  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    dispatch(fetchShowtimes());
  }, [dispatch]);

  useEffect(() => {
    if (cinemaSystems.length > 0) {
      const defaultSystem = cinemaSystems[0].maHeThongRap;
      setSelectedSystem(defaultSystem);
      setSelectedCinema(cinemaSystems[0].lstCumRap[0] || null);
    }
  }, [cinemaSystems]);

  const selectedSystemData = cinemaSystems.find(
    (sys) => sys.maHeThongRap === selectedSystem
  );
  const systemColorClass = systemColors[selectedSystem] || "text-gray-800";

  return (
    <div className="p-4 grid grid-cols-12 gap-4">
      {/* Cột 1: Hệ thống rạp (Nhỏ hơn) */}
      <div className="col-span-2 bg-gray-100 p-2 rounded-lg overflow-x-auto flex md:block">
        {cinemaSystems.map((system) => (
          <button
            key={system.maHeThongRap}
            className={`flex-shrink-0 p-3 rounded-lg flex items-center justify-center ${
              selectedSystem === system.maHeThongRap
                ? "bg-blue-100 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setSelectedSystem(system.maHeThongRap);
              setSelectedCinema(system.lstCumRap[0] || null);
            }}
          >
            <img
              src={system.logo}
              alt={system.tenHeThongRap}
              className="w-10 h-10 items-center justify-center"
            />
          </button>
        ))}
      </div>

      {/* Cột 2: Danh sách cụm rạp (Lớn hơn) */}
      <div className="col-span-4 overflow-y-auto max-h-96">
        {selectedSystemData && (
          <div className="grid grid-cols-1 gap-4">
            {selectedSystemData.lstCumRap?.map((cinema) => (
              <div key={cinema.maCumRap} className="w-full">
                <button
                  className={`block w-full p-3 rounded-lg flex justify-between items-center ${
                    selectedCinema?.maCumRap === cinema.maCumRap
                      ? "bg-blue-100 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedCinema(cinema)}
                >
                  <div>
                    <span className={`font-bold ${systemColorClass}`}>
                      {cinema.tenCumRap}
                    </span>
                    <p className="text-sm text-gray-600">{cinema.diaChi}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cột 3: Thời gian chiếu (Lớn hơn) */}
      <div className="col-span-6 overflow-y-auto max-h-96">
        {selectedCinema ? (
          <div className="p-2 bg-white shadow rounded-lg mt-2">
            {selectedCinema.danhSachPhim?.map((movie) => (
              <div
                key={movie.maPhim}
                className="border p-4 rounded-lg bg-white shadow flex gap-4"
              >
                <img
                  src={movie.hinhAnh}
                  alt={movie.tenPhim}
                  className="w-24 h-36 object-cover rounded-lg"
                />
                <div>
                  <h3 className={`font-bold text-lg ${systemColorClass}`}>
                    {movie.tenPhim}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {movie.thoiLuong} phút
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {movie.lstLichChieuTheoPhim?.map((showtime) => (
                      <button
                        key={showtime.maLichChieu}
                        className="px-3 py-1 bg-green-200 text-green-800 rounded text-center hover:bg-green-300 transition"
                        onClick={() =>
                          navigate(`/booking/${showtime.maLichChieu}`)
                        }
                      >
                        {new Date(
                          showtime.ngayChieuGioChieu
                        ).toLocaleDateString()}{" "}
                        ~{" "}
                        {new Date(
                          showtime.ngayChieuGioChieu
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
            Chọn một cụm rạp để xem lịch chiếu
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowtimesMovies;
