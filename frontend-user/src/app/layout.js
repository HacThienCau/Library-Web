import { Montserrat } from "next/font/google"; // Sử dụng Montserrat font
import "./globals.css";

import RequireAuth from "@/components/RequireAuth";
import { Toaster } from "react-hot-toast";
import Chatbot from "@/components/Chatbot/chatbot";

// Thêm Montserrat font
const montserrat = Montserrat({
  variable: "--font-montserrat", 
  subsets: ["latin"], 
});

export const metadata = {
  title: "ReadHub",
  description: "Hệ thống quản lý thư viện thông minh, hỗ trợ tra cứu, mượn trả sách một cách hiệu quả.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Toaster />
      <RequireAuth>
          {children}
        </RequireAuth>
        <Chatbot />
      </body>
    </html>
  );
}


