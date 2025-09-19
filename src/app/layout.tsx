"use client"
import "./globals.css";
import LayoutWrapper from "./component/layoutWrapper";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "./component/loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="en" className=" scroll-smooth" data-scroll-behavior="smooth">
      <body className={` antialiased capitalize`}>
        {loading && <Loading />}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
