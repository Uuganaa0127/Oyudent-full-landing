// 📂 src/utils/api.ts

import { jwtDecode } from "jwt-decode";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1`;
// const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;



export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: object,
  requiresAuth: boolean = false
) => {
  try {
    //  const token = getTokenFromCookie()
    // if (requiresAuth && !token) {
    //   console.warn("No token found. Authentication required.");
    //   return null;
    // }
     
    // console.log(token,'token');
    const headers: Record<string, string> = {

      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenFromCookie()}` 
    };
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
        // window.location.href = "/"; 
        return null; // No content
      }
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
   else if (response.status === 204) {
      return null; // No content
    }
    const contentType = response.headers.get("Content-Type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      return text || null;
    }
    
  
    return await response.json();
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    throw error;
  }
};

// SignUpUser 

export const signIn = async (userData: {
  username: string;
  password: string;
},a:boolean) => {
  try {


    let response;

    if (a === true) {
      response = await apiRequest("auth/login", "POST", userData);
      window.location.href = "my-account"
    } else {
      response = await apiRequest("auth/login/client", "POST", userData);
    }

    return response;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }

};
export const signUpUser = async (userData: {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  passwordMatch: string;
  register: string;
},a:boolean) => {
  try {
    if (userData.password !== userData.passwordMatch) {
      throw new Error("Passwords do not match.");
    }

    let response;

    if (!a === true) {
      response = await apiRequest("auth/register/", "POST", userData);
    } else {
      response = await apiRequest("auth/register/client", "POST", userData);
    }

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
      if (!token) {
        console.log(token);
        
        // window.location.href = ('/'); 
      }

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
        // console.log("Retrieved token from cookie:", cookies.auth_token);
        return cookies.auth_token;
      } else {
        // console.warn("No auth_token found in cookies.");
      }
    } catch (error) {
      console.error("Error reading token from cookies:", error);
    }
  
    return null;
  };
  
  