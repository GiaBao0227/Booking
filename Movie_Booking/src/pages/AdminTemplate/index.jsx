import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AdminTemplate() {
  /**
   * Neu chua dang nhap => redirect ve auth
   */
  const { data } = useSelector((state) => state.authReducer);
  if (!data) {
    return <Navigate to="/auth" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
