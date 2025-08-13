"use client"
import { fetchChatHistory } from '@/redux/chat.history.redux/chat.history.thunks';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useRef } from 'react'
import Markdown from 'react-markdown';

const page = () => {
    const dispatch=useAppDispatch()
    const { history, loading } = useAppSelector((store) => store.chatHistoryStore);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    // Fetch chat history on mount
    useEffect(() => {
        dispatch(fetchChatHistory());
    }, [dispatch]);


    return (<>
    <h1 className='pt-28 pl-28'><span className='text-blue-500'>chat</span>/history</h1>
      <div className="space-y-4 py-8 px-4 w-full max-w-[750px] mx-auto pb-36">
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
            {loading &&
                <div className="prose max-w-[70%]">
                    <Markdown>Thinking...</Markdown>
                </div>
            }

            {/* Scroll Target */}
            <div ref={bottomRef} />
        </div>
    </>
    )
}

export default page