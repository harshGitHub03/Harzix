"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchChatHistory } from "@/redux/chat.history.redux/chat.history.thunks";
import { sendPrompt } from "@/redux/chat.prompt.redux/chat.prompt.thunks";
import { appendUserPrompt } from "@/redux/chat.history.redux/chat.history.slice";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const { history, loading } = useAppSelector((store) => store.chatHistoryStore);
  const dispatch = useAppDispatch();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { register, handleSubmit, reset } = useForm<{ prompt: string }>();

  // Fetch chat history on mount
  useEffect(() => {
    if(history.length==0)
      dispatch(appendUserPrompt({role:"assistant",content:"Harzix here! How can I help you today?"}))
    dispatch(fetchChatHistory());
  }, [dispatch]);

  // Scroll to bottom when history updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, prompt]);

  // Handle form submit
  const onSubmit = async (data: { prompt: string }) => {
    setPrompt(data.prompt);
    if (data.prompt.length > 0) {
      await dispatch(appendUserPrompt({ role: "user", content:data.prompt }))
      await dispatch(sendPrompt(data.prompt));
    }
    setPrompt("");
    reset();
  };

  // Handle Enter key press
  const onEnterPrompt = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSubmit(onSubmit)(); // trigger react-hook-form submission
    }
  };


  return (
    <>
      {/* Chat Messages */}
      <div className="space-y-4 py-8 px-4 w-full max-w-[750px] mx-auto pt-36 pb-36">

        {history.map((message, i) => (
          <div key={i} className="flex">
            {message.role === "user" ? (
              <div className="ml-auto max-w-[70%] rounded-xl bg-gray-800 px-4 py-2 text-white">
                {message.content}
              </div>
            ) : (
              <div className="prose max-w-[70%]">
                <Markdown>{message.content}</Markdown>
              </div>
            )}
          </div>
        ))}

        {/* Assistant Thinking message */}
        {loading && (
          <div className="flex">
            <div className="prose max-w-[70%]">
              <Markdown>Thinking...</Markdown>
            </div>
          </div>
        )}

        {/* Scroll Target */}
        <div ref={bottomRef} />
      </div>

      {/* Prompt Input */}
      <div className="fixed bottom-[-5px] left-1/2 transform -translate-x-1/2 w-[90vw] md:w-[50vw] mb-8 px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-3xl mx-auto">
          <fieldset className="relative flex w-full">
            <textarea
              onKeyDown={onEnterPrompt}
              rows={3}
              autoFocus
              placeholder="I want to build a..."
              required
              {...register("prompt")}
              className="block w-full rounded-xl border border-gray-300 bg-gray-100 p-2 pr-12 outline-black resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute bottom-2 right-2 rounded-full p-2 text-black hover:bg-gray-100 disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
