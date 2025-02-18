// Seat.jsx
import React, { useState } from "react";

const Seat = ({ seat, onSelectSeat, selectedSeats }) => {
  const isSelected = selectedSeats.includes(seat.maGhe);
  const isAvailable = seat.tinhTrang === "AVAILABLE"; // Assuming seat status is either "AVAILABLE" or "BOOKED"

  const handleSelect = () => {
    if (isAvailable) {
      onSelectSeat(seat.maGhe);
    }
  };

  return (
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
        isSelected
          ? "bg-blue-500 text-white"
          : isAvailable
          ? "bg-gray-300 hover:bg-gray-400"
          : "bg-red-500"
      }`}
      onClick={handleSelect}
    >
      {seat.stt}
    </div>
  );
};

export default Seat;
