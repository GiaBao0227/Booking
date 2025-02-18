import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./../../../services/api";
import { data } from "react-router-dom";
import { content } from "flowbite-react/tailwind";

export const actLogin = createAsyncThunk(
  "auth/actLogin",
  async (user, { rejectWithValue }) => {
    try {
      // const result = await axios({
      //   url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      //   method: "GET",
      //   headers: {
      //     TokenCybersoft:
      //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjIwLzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Mjk2OTYwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzMTE3MjAwfQ.Qh5EKISAVqlhbNkgh1gtzDLUv1TXC7WpqNdNpAS2274",
      //   },
      // });
      // console.log(result);

      const result = await api.post("/QuanLyNguoiDung/DangNhap", user);
      /**
       * check permission user
       *    Neu la Khachhang => show error
       *    Neu la QuanTri =>
       * */
      const userInfor = result.data.content;
      if (userInfor.maLoaiNguoiDung === "KhachHang") {
        return rejectWithValue({
          response: {
            data: {
              content: "Ban khong co quyen truy cap",
            },
          },
        });
      }

      /**
       * 1.Save userInfor to local storege
       * 
       */

      localStorage.setItem("userInfor" ,JSON.stringify(userInfor))
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const userInfor = localStorage.getItem("userInfor")? JSON.parse(localStorage.getItem("userInfor")):null;

const initialState = {
  loading: false,
  data: userInfor,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
