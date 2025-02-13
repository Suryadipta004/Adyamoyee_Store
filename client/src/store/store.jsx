import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
// import product

export const store = configureStore({
  reducer: {
    user: userReducer

  },
})