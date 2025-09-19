"use client";
import "../../globals.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NavBarAdmin from "@/app/component/navAdmin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
      const { status } = useSession();
      const router = useRouter();
      console.log(status);
      useEffect(() => {
        if (status === "unauthenticated") {
          router.push("/admin")
        };
      }, [router, status]);
      console.log(status);
    return (
            <div className={` antialiased capitalize bg-second`}>
                <SessionProvider>
                    <div className="flex md:flex-row flex-col h-screen overflow-hidden bg-second">
                        {/* Sidebar */}
                        <div className="md:w-48 w-full min-h-14  bg-hijau text-white overflow-y-auto">
                            <NavBarAdmin />
                        </div>
                        {/* Main Content */}
                        <div className="flex-1 h-full overflow-y-auto">
                            <div className="md:w-11/12 md:rounded-xl min-h-screen max-w-7xl mx-auto bg-white p-6 md:mb-8 md:mt-8 shadow">
                                {children}
                            </div>
                        </div>
                    </div>
                </SessionProvider>
            </div>
    );
}
