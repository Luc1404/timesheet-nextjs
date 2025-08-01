# Timesheet Next.js Application

## Mô tả
Ứng dụng Timesheet được xây dựng bằng Next.js với hệ thống authentication tích hợp.

## Tính năng chính

### Authentication
- Trang đăng nhập với giao diện Material-UI
- Tích hợp API authentication: `https://training-api-timesheet.nccsoft.vn/api/TokenAuth/Authenticate`
- Lưu trữ session bằng localStorage và cookies
- Bảo vệ route với middleware
- Nút logout trong sidebar

### Giao diện
- Trang login với background teal và form trắng
- Responsive design
- Loading states và error handling
- Material-UI components

## Cấu trúc dự án

```
timesheet-nextjs/
├── app/
│   ├── dashboard/          # Trang dashboard (cần đăng nhập)
│   ├── layout.tsx          # Layout chính với providers
│   ├── page.tsx            # Trang chính (login)
│   └── globals.css
├── components/
│   ├── AuthContext.tsx     # Context quản lý authentication
│   ├── Login.tsx           # Component đăng nhập
│   ├── Header/             # Header component
│   ├── Sidebar/            # Sidebar với nút logout
│   ├── ProjectToolbar/     # Toolbar quản lý projects
│   └── ClientProviders.tsx # Providers cho Material-UI
├── middleware.ts           # Middleware bảo vệ routes
└── package.json
```

## Cách sử dụng

### Chạy ứng dụng
```bash
npm run dev
```

### Truy cập
- Mở trình duyệt tại `http://localhost:3000`
- Trang mặc định sẽ hiển thị form đăng nhập
- Sau khi đăng nhập thành công, sẽ chuyển hướng đến `/dashboard`

### API Authentication
Ứng dụng sử dụng API endpoint:
```
POST https://training-api-timesheet.nccsoft.vn/api/TokenAuth/Authenticate
```

Body request:
```json
{
  "userNameOrEmailAddress": "email@example.com",
  "password": "password",
  "rememberClient": true
}
```

## Bảo mật
- Middleware bảo vệ route `/dashboard/*`
- Session được lưu trong localStorage và cookies
- Access token được lưu trữ an toàn
- Tự động logout khi token hết hạn

## Công nghệ sử dụng
- Next.js 15.4.3
- React 19.1.0
- Material-UI v7
- TypeScript
- Emotion (CSS-in-JS)

## Phiên bản
© 2025 Timesheet. Version 4.3.0.0 [20251703]
