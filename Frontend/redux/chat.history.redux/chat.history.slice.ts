// store/slices/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchChatHistory } from './chat.history.thunks';
import { toast } from 'react-toastify';
import { sendPrompt } from '../chat.prompt.redux/chat.prompt.thunks';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatState {
  history: ChatMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  history: [],
  loading: false,
  error: null,
};

const chatHistorySlice = createSlice({
  name: 'chat/history',
  initialState,
  reducers: {
    clearChatHistory: (state) => {
      state.history = [];
      state.loading = false;
        state.error = null;
    },
    appendUserPrompt:(state,action)=>{
      state.history.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      // for fetch history in bulk
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action: PayloadAction<ChatMessage[]>) => {
        toast.success("got data")
        state.history = action.payload;
        state.loading = false;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        toast.success("error fetching data")
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch chat history';
      })

      //on prompt 
      .addCase(sendPrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.history.push(...action.payload);
      })
      .addCase(sendPrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong.";
      });
  },
});

export const { clearChatHistory,appendUserPrompt } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;
