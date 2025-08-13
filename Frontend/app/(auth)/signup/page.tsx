

"use client";

import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/store"
import { registerUser } from "@/redux/auth.redux/auth.thunks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
// export const metadata = {
//   title: "Sign Up - Harzix",
//   description: "Create your account on Harzix",
// };

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
    const resultAction = await dispatch(registerUser(data))
    if (registerUser.fulfilled.match(resultAction)) {
      // registration succeeded
      router.push("/chat");
    };
  }
  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Create your Harzix account</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              className="form-input w-full py-2"
              type="text"
              placeholder="Corey Barker"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="corybarker@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              className="form-input w-full py-2"
              type="text"
              placeholder="(+750) 932-8907"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[0-9\s()-]+$/, // RegEx to allow +, digits, spaces, () and -
                  message: "Enter a valid phone number",
                },
              })}
            />

            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form-input w-full py-2"
              type="password"
              autoComplete="on"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="submit"
            className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]"
          >
            Register
          </button>

        </div>
      </form>

      {/* Bottom link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-blue-600 underline hover:no-underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}