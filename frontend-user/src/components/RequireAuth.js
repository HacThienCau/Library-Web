"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/app/components/Header";
import { HeaderGuest } from "@/app/components/HeaderGuest";

const RequireAuth = ({ children }) => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, [pathname]);

  if (isLoading) return null; // hoặc loading spinner

  // Nếu đang ở trang đăng nhập thì không hiện header hoặc hiện HeaderGuest
  if (pathname === "/user-login") {
    return (
      <>
    
        {children}
      </>
    );
  }

  // Các trang khác
  return (
    <>
      {isLoggedIn ? <Header /> : <HeaderGuest />}
      {children}
    </>
  );
};

export default RequireAuth;
