import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 为 API 路由增加请求体大小限制
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    // 这里的限制由 next.config.ts 中的 serverRuntimeConfig 控制
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
