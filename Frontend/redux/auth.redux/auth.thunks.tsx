import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { logout } from './auth.slice';
import { clearChatHistory } from '../chat.history.redux/chat.history.slice';

// types.ts (or at the top of your file)
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string; // Added for toast support
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}


async function handleFetchResponse(res: Response) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Unknown server error');
  }
  return data;
}

// REGISTER
export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await handleFetchResponse(res);
    return {
      user: data.user,
      token: data.token,
      message: data.message, // Include message
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || 'Registration failed');
  }
});

// LOGIN
export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (payload, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await handleFetchResponse(res);
    return {
      user: data.user,
      token: data.token,
      message: data.message, // Optional
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || 'Login failed');
  }
});

// GET USER DETAILS
export const getUserDetails = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/getUserDetails', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const res = await fetch('http://localhost:3001/auth/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleFetchResponse(res);
    return data.user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || 'Failed to fetch user');
  }
});



//logout thunk
export const logoutThunk = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  // Clear token or user-related data
  localStorage.removeItem("token");

  //dispatch thunks
  dispatch(logout())
  dispatch(clearChatHistory())
});
