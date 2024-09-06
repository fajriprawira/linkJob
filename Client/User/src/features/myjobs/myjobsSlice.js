import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
  myjobs: [],
  loading: false,
  error: "",
};

export const myjobsSlice = createSlice({
  name: "myjobs",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true 
      state.myjobs = [] 
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false
      state.myjobs = action.payload
      state.error = ""
    },
    fetchReject(state, action) {
      state.loading = false
      state.myjobs = []
      state.error = action.payload
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = myjobsSlice.actions;

export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const { data } = await axios.get("http://localhost:3000/myjob", {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    dispatch(fetchSuccess(data.data));
  } catch (error) {
    dispatch(fetchReject(error.message));
  }
};

// Secara otomatis dari slice yang dibuat juga menyediakan reducernya.
export default myjobsSlice.reducer;
