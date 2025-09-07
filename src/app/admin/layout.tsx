"use client"
import "../globals.css";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className=" scroll-smooth" data-scroll-behavior="smooth">
            <body
                className={` antialiased capitalize`}
            >
                <SessionProvider>
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
