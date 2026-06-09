// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  // Only limit the subscribe API
  if (request.nextUrl.pathname === '/api/subscribe') {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour
    const maxRequests = 3; // 3 requests per hour per IP

    const record = rateLimit.get(ip);
    if (record && now < record.resetTime) {
      if (record.count >= maxRequests) {
        return new NextResponse(
          JSON.stringify({ error: 'Too many requests. Please try again later.' }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }
      record.count++;
    } else {
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    }
  }

  return NextResponse.next();
}