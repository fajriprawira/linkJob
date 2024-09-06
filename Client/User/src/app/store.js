import { configureStore } from '@reduxjs/toolkit'
import myjobs from "../features/myjobs/myjobsSlice"
import profile from "../features/profile/profileSlice"


export const store = configureStore({
  reducer: {
    myjobs,
    profile
  },
})