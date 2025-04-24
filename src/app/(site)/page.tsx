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

          return;
        }
        setToken(token);
        const decoded: DecodedToken = jwtDecode(token);
        setUserRole(decoded.roles);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(currentTime, "Current Time");
        console.log(decoded, "Decoded Token");
        console.log(decoded.roles == "admin", "Decoded");
        if (decoded.roles == "admin") {
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/signin"); // ✅ Redirect on error
      }
    };

    fetchToken();
  }, [router]);
  return <Home />;
}
