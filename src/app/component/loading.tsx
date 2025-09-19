// app/component/Loading.tsx
"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-hijau border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-hijau font-bold">Loading...</p>
      </div>
    </div>
  );
}
