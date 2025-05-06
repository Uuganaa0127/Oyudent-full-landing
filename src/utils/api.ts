import { jwtDecode } from "jwt-decode";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1`;

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000; // seconds
    return decoded.exp < currentTime;
  } catch (err) {
    console.error("Invalid token format.");
    return true; // assume expired
  }
};

export const getTokenFromCookie = () => {
  try {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>);

    return cookies.auth_token || null;
  } catch (error) {
    console.error("Error reading token from cookies:", error);
    return null;
  }
};

const redirectToHome = () => {
  
  document.cookie = "auth_token=; Path=/; Max-Age=0"; // delete cookie
  window.location.href = "/";
};
export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: object,
  requiresAuth: boolean = false
) => {
  try {
    const token = getTokenFromCookie();

    if (requiresAuth && (!token || isTokenExpired(token))) {
      console.warn("No valid token. Redirecting...");
      redirectToHome();
      return null;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get("Content-Type");
    const isJSON = contentType?.includes("application/json");

    const data = isJSON ? await response.json() : await response.text();

    if (!response.ok) {
      // Handle 401 for protected routes
      if (response.status === 401 && requiresAuth) {
        console.warn("401 Unauthorized. Redirecting...");
        redirectToHome();
        return null;
      }

      // Return structured error
      throw { status: response.status, data };
    }

    return data || null;
  } catch (error: any) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    // Re-throw structured errors for `signIn` or others to handle
    if (error?.data) return error.data;
    throw error;
  }
};

// Token Storage
export const storeToken = (token: string) => {
  try {
    const decoded: { roles: string[] } = jwtDecode(token);
    const isAdmin = decoded.roles.includes("admin");

    document.cookie = `auth_token=${token}; Path=/; SameSite=Lax; Max-Age=86400`;
    console.log(`${isAdmin ? "Admin" : "Client"} token stored.`);
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};

// Auth
export const signIn = async (
  userData: { username: string; password: string }
) => {
  try {
    // const endpoint = "auth/login/client";
    const endpoint = "auth/login";

    const response = await apiRequest(endpoint, "POST", userData);

    if (response?.access_token) {
      return response;
    }

    // Handle backend error response format
    if (response?.message) {
      return { error: response.message };
    }

    return { error: "Нэвтрэх үед тодорхойгүй алдаа гарлаа." };
  } catch (error: any) {
    console.error("Sign-in Error:", error);
    return { error: error?.message || "Сервертэй холбогдож чадсангүй." };
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
}) => {
  try {
    if (userData.password !== userData.passwordMatch) {
      throw new Error("Passwords do not match.");
    }
    return await apiRequest("auth/register/client", "POST", userData);
  } catch (error) {
    console.error("Sign-up Error:", error);
    throw error;
  }
};
