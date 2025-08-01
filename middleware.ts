import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Kiểm tra nếu đang truy cập vào dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Kiểm tra trạng thái đăng nhập từ cookie hoặc header
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'
    
    if (!isAuthenticated) {
      // Chuyển hướng về trang login nếu chưa đăng nhập
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
} 