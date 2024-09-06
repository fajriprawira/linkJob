import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
  profile: {},
  loading: false,
  error: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true 
      state.profile = {} 
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false
      state.profile = action.payload
      state.error = ""
    },
    fetchReject(state, action) {
      state.loading = false
      state.profile = {}
      state.error = action.payload
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = profileSlice.actions;

export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const { data } = await axios.get("http://localhost:3000/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    // console.log(data.profile,"ini data ya bosku")

    dispatch(fetchSuccess(data.profile));
  } catch (error) {
    dispatch(fetchReject(error.message));
  }
};

// Secara otomatis dari slice yang dibuat juga menyediakan reducernya.
export default profileSlice.reducer;
