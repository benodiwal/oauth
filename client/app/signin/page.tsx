"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const page = () => {
  return (
    <div>
      <SignInForm />
    </div>
  );
};

const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLoginSuccess = (response: any) => {
    // Handle Google login success, e.g., send the token to your backend for authentication
    console.log("Google login success:", response);
  };

  const handleGoogleLoginFailure = (error: any) => {
    // Handle Google login failure
    console.error("Google login failure:", error);
  };

  const handleSubmit = async (token: string) => {
    const response = await axios.post(
      "http://localhost:5000/auth/google/callback",
      {
        token: token,
      }
    );

    console.log(response.data);

    if (response.status == 200) {
      router.push("/profile");
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);

      const data = await handleSubmit(tokenResponse.access_token);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          {/* ... (Existing form inputs) */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
          <span className="mr-2">or</span>
          <button
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            onClick={() => login()}
          >
            <i
              data-icon="google"
              data-inline="false"
              className="mr-2 text-2xl"
            ></i>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default page;
