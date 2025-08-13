"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/store"; // Update if needed
import LogoutPopup from "./chat.logout.popup";
// import { logout } from "@/redux/auth/auth.slice"; // if you have logout action

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false) //logout popup

  // Mock user (replace with auth state from Redux or Context)
  const { user } = useAppSelector((state) => state.authStore) || {
    user: { name: "Jane Doe", email: "jane@example.com" },
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (<>
    <header className="border-b-2 border-b-gray-200 fixed top-0 w-full bg-white flex items-center justify-between px-14 py-4 z-50 shadow-sm">
      {/* Logo */}
      {/* <Link href="/"> */}
        <a
          className="text-2xl font-bold"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
        >
          <span className="text-blue-500">Har</span>zix
        </a>
      {/* </Link> */}

      {/* Navigation Links */}
      <nav className="flex items-center gap-8">
        <Link href="/chat" className="text-xl hover:text-blue-500">
          Chat
        </Link>
        <Link href="/chat/history" className="text-xl hover:text-blue-500">
          History
        </Link>
        <Link href="/chat/docs" className="text-xl hover:text-blue-500">
          Docs
        </Link>


        {/* User Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
            👤
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4">
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 border-t"
              >
                🔓 Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
    <LogoutPopup isOpen={isOpen} setIsOpen={setIsOpen} />
  </>);
};

export default Header;
