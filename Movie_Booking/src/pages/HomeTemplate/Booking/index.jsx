// index.jsx (BookingPage)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowtimeDetail } from "./slice"; // This should fetch the showtime details including seat availability
import Seat from "./Seat";

export default function BookingPage() {
  const { id } = useParams(); // Use the showtime id
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showtimeDetail, loading } = useSelector(
    (state) => state.bookingReducer
  );
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    dispatch(fetchShowtimeDetail(id));
  }, [dispatch, id]);

  const handleSelectSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirmBooking = () => {
    // Handle booking confirmation (e.g., API call to book seats)
    console.log("Booking confirmed for seats:", selectedSeats);
  };

  if (loading) return <p>Loading...</p>;
  if (!showtimeDetail) return <p>No showtime data found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Chọn ghế</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Chọn ghế của bạn</h2>
        <div className="grid grid-cols-8 gap-4 mt-4">
          {showtimeDetail.danhSachGhe.map((seat) => (
            <Seat
              key={seat.maGhe}
              seat={seat}
              onSelectSeat={handleSelectSeat}
              selectedSeats={selectedSeats}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Ghế đã chọn</h2>
        <div className="flex gap-3 mt-2">
          {selectedSeats.map((seatId) => (
            <span
              key={seatId}
              className="bg-blue-500 text-white p-2 rounded-full"
            >
              {seatId}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleConfirmBooking}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg"
        >
          Xác nhận đặt vé
        </button>
      </div>
    </div>
  );
}
