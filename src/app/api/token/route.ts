import { NextResponse } from "next/server";
 
export async function GET(req: Request) {
  const res = await fetch("https://www.onemap.gov.sg/api/auth/post/getToken", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: process.env.ONEMAP_EMAIL,
        password: process.env.ONEMAP_KEY
    })
  });
  const token = await res.json();
  return NextResponse.json({ token });
}