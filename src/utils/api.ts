// 📂 src/utils/api.ts

import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "http://103.41.112.95:3000/v1";

export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: object,
  requiresAuth: boolean = false
) => {
  try {
    let token = localStorage.getItem("auth/admin") || localStorage.getItem("auth/client");

    // 🔥 If token is missing and request requires auth, try logging in
    if (requiresAuth && !token) {
      console.warn("No token found. Attempting auto-login...");
      return null; // Prevent unauthorized requests
    }

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    throw error;
  }
};
// SignUpUser 

export const signUpUser = async (userData: {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  passwordMatch: string;
  register: string;
}) => {
  try {
    if (userData.password !== userData.passwordMatch) {
      throw new Error("Passwords do not match.");
    }

    const response = await apiRequest("auth/register/client", "POST", userData);

    console.log("User signed up successfully:", response);
    return response;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

// 🔥 Store Token Based on Role




export const storeToken = (token: string) => {
    try {
      const decoded: { roles: string[] } = jwtDecode(token);
      const isAdmin = decoded.roles.includes("admin");
  
      // ✅ Ensure the cookie is set without `Secure` on localhost
      document.cookie = `auth_token=${token}; Path=/; SameSite=Lax; Max-Age=86400`;
  
      console.log(`${isAdmin ? "Admin" : "Client"} token stored in cookie:`, token);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };
  

// 🔥 Get Token from Cookies
export const getTokenFromCookie = () => {
    try {
      const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
      }, {} as Record<string, string>);
  
      if (cookies.auth_token) {
        console.log("Retrieved token from cookie:", cookies.auth_token);
        return cookies.auth_token;
      } else {
        console.warn("No auth_token found in cookies.");
      }
    } catch (error) {
      console.error("Error reading token from cookies:", error);
    }
  
    return null;
  };
  
  