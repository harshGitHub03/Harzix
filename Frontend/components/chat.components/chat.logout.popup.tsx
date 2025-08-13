// components/LogoutPopup.tsx
"use client";

import { logoutThunk } from "@/redux/auth.redux/auth.thunks";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type LogoutPopupProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogoutPopup: React.FC<LogoutPopupProps> = ({ isOpen, setIsOpen }) => {
    const dispatch = useAppDispatch()
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter()



    //logout
    const logout = async () => {
        const result = await dispatch(logoutThunk())
        if (logoutThunk.fulfilled.match(result)) {
            window.location.href = "/signin";
        }
    }


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
                <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { logout() }}
                        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutPopup;
