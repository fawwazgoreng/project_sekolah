"use client";

import { usePathname } from "next/navigation";
import NavBar from "./nav";
import { Footer } from "./footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/admin");

  return (
    <>
      {!isLogin && <NavBar />}
      {children}
      {!isLogin && <Footer />}
    </>
  );
}