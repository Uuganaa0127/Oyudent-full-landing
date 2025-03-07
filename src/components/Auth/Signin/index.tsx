"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { apiRequest, storeToken, getTokenFromCookie } from "@/utils/api"; // ✅ Import API functions

type DecodedToken = {
  exp: number;
  iat: number;
  roles: string[];
  sub: number;
};

const Signin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [test, setTest] = useState<DecodedToken | null>(null);
  const [userRole, setUserRole] = useState<boolean | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // ✅ Get token from cookies
        const token = getTokenFromCookie();

        if (token) {
          decodeToken(token); // ✅ Decode if token exists
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []); 

  // ✅ Updated Admin Login API
  const checkLoginA = async () => {
    try {
      const data = await apiRequest("auth/login", "POST", formData);
      if (data?.access_token) {
        storeToken(data.access_token);
        decodeToken(data.access_token);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // ✅ Updated Client Login API
  const checkLoginC = async () => {
    try {
      const data = await apiRequest("auth/login/client", "POST", formData);
      if (data?.access_token) {
        storeToken(data.access_token);
        decodeToken(data.access_token);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // ✅ Decode Token
  const decodeToken = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setTest(decoded);
      setUserRole(decoded.roles.includes("admin") ? true : false);
    } catch (error) {
      console.error("Invalid Token", error);
    }
  };

  return (
    <>
      {/* ✅ Your existing design & logic remain unchanged */}
      <div className="flex gap-4">
  <button
    onClick={() => setUserRole(true)}
    className={`w-full flex justify-center font-medium text-black py-3 px-6 rounded-lg transition-all duration-300 
      ${userRole ? "bg-blue-600 shadow-lg scale-105" : "bg-gray-500 hover:bg-blue-500"}`}
  >
    Admin нэвтрэх
  </button>
  <button
    onClick={() => setUserRole(false)}
    className={`w-full flex justify-center font-medium text-black py-3 px-6 rounded-lg transition-all duration-300 
      ${!userRole ? "bg-blue-600 shadow-lg scale-105" : "bg-gray-500 hover:bg-blue-500"}`}
  >
    Эмчээр нэвтрэх
  </button>
</div>

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Sign In to Your Account
              </h2>
              <p>Enter your details below</p>
            </div>

            <div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  userRole ? checkLoginA() : checkLoginC();
                }}
              >
                <div className="mb-5">
                  <label htmlFor="username" className="block  mb-2.5">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    id="password"
                    placeholder="Enter your password"
                    autoComplete="on"
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                >
                  {userRole ? "Sign in to Admin" : "Sign in to Client"}
                </button>
              </form>

              <button
                onClick={getTokenFromCookie}
                className="w-full flex justify-center font-medium text-black bg-gray-700 py-3 px-6 rounded-lg ease-out duration-200 hover:bg-gray-900 mt-7.5"
              >
                Get Token from Cookies
              </button>

              {test && (
                <div className="bg-gray-100 p-4 rounded-lg mt-5">
                  <h2 className="text-lg font-semibold">Welcome, User {test.sub}</h2>
                  <p>Role: {test.roles.join(", ")}</p>
                  <p>Issued At: {new Date(test.iat * 1000).toLocaleString()}</p>
                  <p>Expires At: {new Date(test.exp * 1000).toLocaleString()}</p>
                </div>
              )}

              {!test && <p className="text-center mt-5 text-gray-500">Not authenticated</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
