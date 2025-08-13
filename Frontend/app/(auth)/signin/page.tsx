'use client';

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/auth.redux/auth.thunks";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Sign In - Simple",
//   description: "Page description",
// };

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("Submitted:", data);
    const resultAction = await dispatch(loginUser(data))
    if (loginUser.fulfilled.match(resultAction)) {
      // registration succeeded
      router.push("/chat");
    };
    // handle auth here
  };


  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Sign in to your account</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input w-full py-2"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="on"
              className="form-input w-full py-2"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]"
          >
            Sign In
          </button>
        </div>
      </form>

      {/* Bottom link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            className="font-medium text-blue-600 underline hover:no-underline"
            href="/signup"
          >
            register
          </Link>
        </p>
      </div>
    </>
  );
}
