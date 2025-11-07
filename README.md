# 📚 ReadHub Library Web

<p align="center">
  <a href="https://www.uit.edu.vn/" title="University of Information Technology" style="border: none;">
    <img src="https://i.imgur.com/WmMnSRt.png" alt="University of Information Technology">
  </a>
</p>

<h1 align="center"><b>IE303.P22 - Lập trình Java</b></h1>

## 👥 Thành viên nhóm:
| **STT** | **MSSV** | **Họ tên**            |  **Email**                  |
| ------- | -------------- | ------------------------ | -------------------------- |
| 1       | 22521641       | Nguyễn Đăng Hương Uyên   | 22521641@gm.uit.edu.vn     |
| 2       | 22521701       | Đỗ Mai Tường Vy          | 22521701@gm.uit.edu.vn     |
| 3       | 22520298       | Lê Nguyễn Thùy Dương     | 22520298@gm.uit.edu.vn     |
| 4       | 22520590       | Nguyễn Lê Thanh Huyền    | 22520590@gm.uit.edu.vn     |

## 🏠 Giới thiệu
ReadHub là hệ thống quản lý thư viện hiện đại, bao gồm cả giao diện người dùng và hệ thống quản trị. Dự án được phát triển theo mô hình client-server với frontend sử dụng ReactJS + NextJS và backend là Spring Boot (Maven).

Link repo gốc: https://github.com/WinYoon0101/Library-Web

Ứng dụng web được chia thành 3 giao diện chính:

- **General**: Giao diện chung, dùng để tiến hành quét mã lấy/trả sách.
- **User**: Giao diện dành cho độc giả với các chức năng như đăng nhập, tìm kiếm sách, xem lịch sử mượn, v.v.
- **Admin**: Giao diện quản trị với các chức năng như quản lý sách, người dùng, phiếu mượn, thống kê, v.v.

## ✨ Tính năng
### **Về User**
- Đăng nhập, đăng ký, đăng xuất, quên mật khẩu, đổi mật khẩu
- Xem danh mục và chi tiết sách
- Thêm sách vào giỏ sách
- Trò chuyện cùng chatbot AI
- Mượn sách ngay
- Mượn sách trong giỏ sách
- Xem các phiếu mượn của người dùng
- Xem các phiếu phạt của người dùng
- Thanh toán phiếu phạt
### **Về Admin**
- Xem thống kê tổng quan
- Quản lý người dùng
- Quản lý sách
- Quản lý phiếu mượn
- Quản lý phiếu phạt
- Cài đặt tham số mặc định
### **Về General**
- Quét mã qua barcode hoặc hình ảnh
- Xem các phiếu mượn, đang mượn
- Mượn sách
- Trả sách
- Tạo phiếu phạt

## ⚙️ Tech Stack
- **Frontend**: Next.js, React, TailwindCSS, Zustand
- **Backend**: Spring Boot, Spring Data MongoDB, Spring Security, JWT, OpenCV, ZXing, Cloudinary, Google Drive API, Google OAuth2, Jakarta Mail, Lombok, Jackson
- **Package Manager**: npm, pip
- **Database**: MongoDB
- **DevOps & Tools**: Vercel, Render


## 🛠️ Cài đặt & chạy ứng dụng

### Các bước
1. Clone repository:

```bash 
git clone https://github.com/WinYoon0101/Library-Web
cd Library-Web
```

2. Tải dependencies và Local Development:
    -   **Backend**:

        ```bash
        cd backend/library
        mvn clean install
        mvn spring-boot:run
        ```
    -   **Frontend-user**:
        ```bash
        cd frontend-user
        npm install
        npm run dev
        ```
    -   **Frontend-admin**:
        ```bash
        cd frontend-admin
        npm install
        npm run dev
        ```
    -   **Frontend-general**:
        ```bash
        cd frontend-general
        npm install
        npm run dev
        ```

## 🔧 Thiết lập các biến môi trường
1. **Backend**
- Tạo `application.properties` trong `backend/library/src/main/resources`
- Thêm các biến môi trường của bạn:
```
spring.application.name=library

server.port:8081
spring.data.mongodb.uri=your-mongo-url
appName=Library
spring.data.mongodb.database=your-mongo-database

cloudinary.cloud_name=your-cloudinary-cloud-name
cloudinary.api_key=your-cloudinary-api-key
cloudinary.api_secret=your-cloudinary-api-secret

spring.mail.username=your-gmail-address
spring.mail.password=your-gmail-app-password
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

google.drive.application-name=your-google-drive-app-name
google.drive.service-account-key=your-google-service-account-json

spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

momo.partnerCode=your-momo-partner-code
momo.accessKey=your-momo-access-key
momo.secretKey=your-momo-secret-key
momo.redirectUrl=http://localhost:3000/fine/handle-payment
momo.ipnUrl=http://localhost:8081/fine/momo-ipn

OPENAI_API_KEY=your-openai-api-key
```
2. **Frontend User**
- Tạo `.env` trong `frontend-user`
- Thêm các biến môi trường của bạn:
```env
OPENAI_API_KEY=your-openai-api-key

MONGODB_URI=your-mongodb-connection-url
MONGODB_DBNAME=your-database-name
MONGODB_COLLECTIONNAME=your-collection-name
MONGODB_DOCUMENTID=your-document-id
```

## 🚀 Deployment
Readhub hiện đã được deploy. Bạn có thể xem mẫu tại các đường dẫn sau:
#### User: https://library-web-readhub.vercel.app/
#### Admin: https://library-web-admin.vercel.app/
#### General: https://library-web-scanner.vercel.app/

## 📧 Liên hệ
Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với tôi qua email: dragneel.takeshi@gmail.com hoặc 22521641@gm.uit.edu.vn
