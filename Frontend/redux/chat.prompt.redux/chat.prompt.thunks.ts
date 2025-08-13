// redux/chatPromptRedux/chat.prompt.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { json } from "stream/consumers";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const sendPrompt = createAsyncThunk<
  Message[], // Return type
  string     // Argument type (prompt string)
>("chatPrompt/sendPrompt", async (prompt, thunkAPI) => {
  try {

    // get token from localstorage and pass
    const token = localStorage.getItem("token")

    const res = await fetch('http://localhost:3001/chat', {
      method: 'POST',
      credentials: 'include', // include cookies if needed
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });


    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to send prompt");
    }

    const data = await res.json();

    const messages: Message[] = [
      // { role: "user", content: prompt },
      { role: data.role, content: data.content },
    ];

    return messages;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
