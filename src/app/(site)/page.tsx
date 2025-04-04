"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getTokenFromCookie } from "@/utils/api"; // ✅ Use imported function
import Home from "@/components/Home";

interface DecodedToken {
  roles: string;
  sub: number;
}

export default function HomePage() {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // ✅ Get token from cookies
        const token = getTokenFromCookie();
        if (!token) {
          <Home />;

          // router.push("/signin"); // ✅ Redirect if no token
          return;
        }

        setToken(token);

        // ✅ Decode the token
        const decoded: DecodedToken = jwtDecode(token);
        setUserRole(decoded.roles);

        const currentTime = Math.floor(Date.now() / 1000);
        console.log(currentTime, "Current Time");
        console.log(decoded, "Decoded Token");
        console.log(decoded.roles == "admin", "Decoded");

        // ✅ Redirect admin users to external dashboard
        if (decoded.roles == "admin") {
          // window.location.href = "http://localhost:5173/dashboard/home";
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/signin"); // ✅ Redirect on error
      }
    };

    fetchToken();
  }, [router]);

  // if (!token) {
  //   return <p>Checking authentication...</p>; // ✅ Show loading message while checking
  // }

  return <Home />;
}
