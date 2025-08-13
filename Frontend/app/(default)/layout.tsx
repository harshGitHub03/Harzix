"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useAppDispatch } from "@/redux/store";
import { getUserDetails } from "@/redux/auth.redux/auth.thunks";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const dispatch=useAppDispatch()

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  },[]);

// useEffect(() => {
//   const fetchUserDetails = async () => {
//     await dispatch(getUserDetails());
//   };
//   fetchUserDetails();
// }, []);


  return (
    <>
      <Header />

      <main className="grow">{children}</main>

      <Footer border={true} />
    </>
  );
}
