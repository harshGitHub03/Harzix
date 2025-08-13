// store/thunks/chatThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatMessage } from './chat.history.slice';

export const fetchChatHistory = createAsyncThunk<ChatMessage[], void, { rejectValue: string }>(
  'chat/fetchChatHistory',
  async (_, thunkAPI) => {
    try {
      // get token from localstorage and pass
      const token = localStorage.getItem("token")

      const response = await fetch('http://localhost:3001/chat-history', {
        method: 'GET',
        credentials: 'include', // include cookies if needed
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message || 'Failed to fetch chat history');
      }

      const data = await response.json();
      console.log(data)
      return data.history as ChatMessage[];
    } catch (error) {
      return thunkAPI.rejectWithValue('Network error while fetching chat history');
    }
  }
);
