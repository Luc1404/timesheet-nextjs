# Timesheet NextJS Application

## Mô tả
Ứng dụng quản lý timesheet được xây dựng bằng Next.js với TypeScript và Material-UI.

## Tính năng chính

### Quản lý Project
- **Tạo project mới**: Form đa tab với các thông tin:
  - **General**: Thông tin cơ bản (Client, Project Name, Project Code, Dates, Project Type)
  - **Team**: Chọn thành viên dự án với vai trò và trạng thái
  - **Tasks**: Chọn và cấu hình các task cho project
  - **Notification**: Cấu hình thông báo Komu và các loại notification

- **Lưu và hiển thị**: 
  - Dữ liệu được lưu vào database thông qua API
  - Tự động refresh danh sách project sau khi tạo thành công
  - Hiển thị thông báo thành công
  - Form được reset sau khi lưu

- **Hiển thị trong Toolbar**:
  - Danh sách project được nhóm theo Customer
  - Hiển thị thông tin chi tiết: tên project, số thành viên, PM, code, ngày bắt đầu/kết thúc, loại project
  - Tìm kiếm theo client hoặc tên project
  - Lọc theo trạng thái (Active/Deactive/All)
  - Actions menu cho mỗi project (Edit, View, Delete)

### Quản lý Client
- Tạo client mới trực tiếp từ form project
- Hiển thị danh sách client trong dropdown

### Quản lý User và Task
- Chọn thành viên từ danh sách user có sẵn
- Chọn task từ danh sách task có sẵn
- Cấu hình billable cho từng task

## Cấu trúc thư mục

```
timesheet-nextjs/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── ProjectToolbar/     # Main project management
│   │   ├── ProjectForm/    # Project creation form
│   │   │   ├── General/    # General information tab
│   │   │   ├── Teams/      # Team selection tab
│   │   │   ├── Task/       # Task selection tab
│   │   │   └── Notification/ # Notification settings tab
│   │   └── ProjectToolbar.tsx
│   ├── Header/             # Application header
│   ├── Sidebar/            # Navigation sidebar
│   └── Login.tsx           # Login component
├── services/               # API services
│   └── api.ts              # API endpoints
├── types/                  # TypeScript type definitions
│   └── index.ts
└── public/                 # Static assets
```

## API Endpoints

### Project
- `GET /services/app/Project/getAll` - Lấy danh sách project
- `GET /services/app/Project/GetQuantityProject` - Lấy số lượng project theo trạng thái
- `POST /services/app/Project/Save` - Tạo/cập nhật project

### Customer
- `GET /services/app/Customer/GetAll` - Lấy danh sách customer
- `POST /services/app/Customer/Save` - Tạo customer mới

### User
- `GET /services/app/User/GetUserNotPagging` - Lấy danh sách user

### Task
- `GET /services/app/Task/GetAll` - Lấy danh sách task

### Branch
- `GET /services/app/Branch/GetAllBranchFilter` - Lấy danh sách branch

## Cách sử dụng

1. **Tạo project mới**:
   - Click nút "New project" trong toolbar
   - Điền đầy đủ thông tin trong các tab
   - Click "Save" để lưu project

2. **Xem danh sách project**:
   - Projects được hiển thị theo nhóm Customer
   - Sử dụng thanh tìm kiếm để lọc project
   - Chọn trạng thái để lọc (Active/Deactive/All)

3. **Quản lý project**:
   - Click "Actions" để mở menu quản lý
   - Chọn Edit/View/Delete tùy theo nhu cầu

## Công nghệ sử dụng

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Framework**: Material-UI (MUI) v7
- **Form Management**: React Hook Form + Yup validation
- **Date Handling**: Day.js
- **Styling**: Emotion CSS-in-JS

## Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Chạy production
npm start
```

## Lưu ý

- Cần có access token trong localStorage để gọi API
- API base URL: `https://training-api-timesheet.nccsoft.vn/api`
- Tất cả API calls đều được authenticate với Bearer token
