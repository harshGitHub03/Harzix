"use client";

import React from "react";

const page = () => {
  return (<>
  
    <h1 className='pt-28 pl-28'><span className='text-blue-500'>chat</span>/docs</h1>
    <div className="px-8 pb-28 pt-5 max-w-4xl mx-auto text-gray-800 space-y-8">
      {/* Title */}
      <h1 className="text-4xl font-bold">
        <span className="text-blue-500">Har</span>zix Chatbot Documentation
      </h1>

      {/* Description */}
      <p className="text-lg leading-relaxed">
        <strong>Harzix</strong> is a smart AI assistant built to help users build projects, answer technical questions, and provide human-like support using natural language.
      </p>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🚀 Features</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Conversational memory within a session</li>
          <li>Renders formatted responses (Markdown-style)</li>
          <li>Secure token-based auth for chat sessions</li>
          <li>Handles async messages and shows "typing" state</li>
          <li>Stores and fetches chat history</li>
        </ul>
      </section>

      {/* Use Cases */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🧠 Use Cases</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Planning projects (e.g., “I want to build a booking app”)</li>
          <li>Code help (e.g., “Write a login function in Next.js”)</li>
          <li>Customer support bots</li>
          <li>Learning & technical guidance</li>
        </ul>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🛠️ Tech Stack</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Frontend:</strong> React + Next.js, TailwindCSS, React Hook Form</li>
          <li><strong>State:</strong> Redux Toolkit</li>
          <li><strong>Rendering:</strong> Dynamic messages + Markdown support</li>
          <li><strong>Backend:</strong> Node.js/Express + JWT-based auth</li>
        </ul>
      </section>

      {/* API Contract */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">📦 API Contract</h2>

        <p className="font-medium">POST <code className="bg-gray-100 px-2 py-1 rounded">/chat</code></p>

        <div className="mt-2">
          <p className="text-sm font-semibold">Request:</p>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`{
  "prompt": "Your input message"
}`}
          </pre>

          <p className="text-sm font-semibold mt-2">Response:</p>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`{
  "role": "assistant",
  "content": "Harzix's reply here"
}`}
          </pre>
        </div>
      </section>

      {/* Example Prompt */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🧩 Example Prompt</h2>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
          I want to build a full-stack app with authentication and payment integration. How do I start?
        </blockquote>
        <p className="mt-2">Harzix will return a step-by-step breakdown to help you begin.</p>
      </section>

      {/* Chat Flow */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💬 Chat Flow</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>User types a message and presses Enter</li>
          <li>Harzix sends the prompt to the backend</li>
          <li>The assistant reply is shown with markdown support</li>
          <li>Messages are saved in chat history</li>
        </ol>
      </section>

      {/* Auth Handling */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🔐 Auth Handling</h2>
        <p>
          Harzix fetches a token from <code className="bg-gray-100 px-2 py-1 rounded">localStorage</code> and attaches it as a <strong>Bearer</strong> token to each request for secure access.
        </p>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-gray-200 text-sm text-gray-500">
        Built with ❤️ by Harsh.
      </footer>
    </div>
</>  );
};

export default page;
