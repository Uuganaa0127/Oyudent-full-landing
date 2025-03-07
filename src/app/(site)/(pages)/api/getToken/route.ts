import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method !== "GET") {
    
    res.setHeader("Allow", ["GET"]); // ✅ Tell browser what methods are allowed
    console.log('dsad');

    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.auth_token; // 🔥 Ensure this matches your cookie name

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  res.status(200).json({ token });
}
