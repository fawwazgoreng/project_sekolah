"use client";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="flex flex-col w-11/12  mx-auto items-center">
          <Image src={logo} className="w-40 h-40  items-center animate-pulse " alt="" ></Image>
        <p className="mt-4 text-hijau text-center font-bold text-4xl">Mts manahijul ulum plaosan</p>
      </div>
    </div>
  );
}
