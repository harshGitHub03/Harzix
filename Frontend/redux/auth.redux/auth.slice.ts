import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser, getUserDetails } from './auth.thunks';
import { toast } from 'react-toastify';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isInitialized: false, // NEW
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.isInitialized = true; // Ensure it's marked
      localStorage.removeItem('token');
      toast.info('Logged out successfully');
    },
    // Optional: explicitly mark initialized if no token
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setInitialize: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        toast.success(action.payload.message || 'Registration successful');
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isInitialized = true; // ✅
      })
      .addCase(registerUser.rejected, (state, action) => {
        toast.error(action.payload || 'Registration failed');
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        state.isAuthenticated = false;
        state.isInitialized = true; // ✅
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        toast.success('Login successful');
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isInitialized = true; // ✅
      })
      .addCase(loginUser.rejected, (state, action) => {
        toast.error(action.payload || 'Login failed');
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
        state.isInitialized = true; // ✅
      })

      // Get User Details (on app load)
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        toast.success('User details loaded');
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true; // ✅
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to load user details');
        state.loading = false;
        state.error = action.payload || 'Fetching user failed';
        state.isAuthenticated = false;
        state.user = null;
        state.isInitialized = true; // ✅
        localStorage.removeItem('token');
      });
  },
});

export const { logout, setAuthenticated,setInitialize } = authSlice.actions;
export default authSlice.reducer;
