"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: true,
      callbackUrl: "/admin/dashboard",
      username,
      password,
    });
    // Optional: if you don't use redirect
    if (res?.error) console.log("Login failed", res.error);
  };
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[60vh] h-full flex flex-col mt-32">
        <div className="w-full shrink-0">
          <div className="w-full h-full px-[10px] rounded-md shadow-lg inset-shadow-xs mt-5">
            <p className="font-bold text-[35px] text-blue-500 text-center">Sign in</p>
            <form
              className="flex flex-col gap-10 mt-[5vh] p-2"
              onSubmit={handleSubmit}
            >
              <div className="relative z-0">
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                             border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  id="username"
                />
                <label htmlFor="username" className="absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 
                                   top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 
                                   peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Username
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                             border-b-2 border-gray-300 appearance-none focus:outline-none 
                             focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  id="password"
                />
                <label htmlFor="password" className="absolute text-sm text-gray-600 duration-300 transform -translate-y-6 
                                   scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 
                                   peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                           hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
                           focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
