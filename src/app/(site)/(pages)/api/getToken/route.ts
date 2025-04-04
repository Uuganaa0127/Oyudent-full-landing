import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const cookies = parse(req.headers.get('cookie') || '');
  const token = cookies.auth_token; // 🔥 Ensure this matches your cookie name

  if (!token) {
    return NextResponse.json({ message: 'No token found' }, { status: 401 });
  }

  return NextResponse.json({ token }, { status: 200 });
}
