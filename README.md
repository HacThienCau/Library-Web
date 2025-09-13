# 📚 ReadHub Library Web
ReadHub là hệ thống quản lý thư viện hiện đại, bao gồm cả giao diện người dùng và hệ thống quản trị. Dự án được phát triển theo mô hình client-server với frontend sử dụng ReactJS + NextJS và backend là Spring Boot (Maven).
## 
Link repo gốc: https://github.com/WinYoon0101/Library-Web

## 🌐 Giao diện người dùng

Ứng dụng web được chia thành 3 giao diện chính:

- **General**: Giao diện chung, dùng để tiến hành quét mã lấy/trả sách.
- **User**: Giao diện dành cho độc giả với các chức năng như đăng nhập, tìm kiếm sách, xem lịch sử mượn, v.v.
- **Admin**: Giao diện quản trị với các chức năng như quản lý sách, người dùng, phiếu mượn, thống kê, v.v.

## 🚀 Cài đặt & chạy ứng dụng
⚠️ Lưu ý: Các file cấu hình chứa thông tin nhạy cảm như database_uri, JWT_SECRET, v.v. vui lòng liên hệ người quản lý dự án để được cấp quyền truy cập.

### 1. Backend (Spring Boot)

```bash
cd backend/library
mvn clean install
mvn spring-boot:run
```

### 2. Frontend User

```bash
cd frontend-user
npm install
npm run dev
```

### 3. Frontend Admin

```bash
cd frontend-admin
npm install
npm run dev
```

### 4. Frontend General

```bash
cd frontend-general
npm install
npm run dev
```

## Deployment
Readhub hiện đã được deploy. Bạn có thể xem tại các đường dẫn sau:
```
User: https://library-web-readhub.vercel.app/
Admin: https://library-web-admin.vercel.app/
General: https://library-web-scanner.vercel.app/

