"use client"
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from "./auth.redux/auth.slice"
import chatHistoryReducer from "./chat.history.redux/chat.history.slice"
// Import your slices here
// import installmentReducer from './store/installmentSlice'; // Update the path if needed

// Create the Redux store
export const store = configureStore({
  reducer: {
    authStore:authReducer,
    chatHistoryStore:chatHistoryReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Custom hooks for use in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
