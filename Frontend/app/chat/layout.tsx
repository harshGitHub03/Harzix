"use client"
import Link from "next/link";

import ChatHeader from "../../components/chat.components/chat.navbar"
import ProtectRoute from "./protectRoute/page"

import { useAppDispatch } from "@/redux/store";


// export const metadata = {
//   title: "Harzix",
//   description: "Next gen chatbot",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch=useAppDispatch()
  


  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={` bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
    <ProtectRoute>
        <div className="flex flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          
          <ChatHeader/>
          {children}
        </div>
    </ProtectRoute>
      </body>
    </html>

  );
}