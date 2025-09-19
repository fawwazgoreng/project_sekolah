'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DataAbout } from "@/app/types/types";
import { BeritaGet } from "@/app/api/berita";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";


export default function BeritaNews() {
    const [ITEMS_PER_PAGE, setItemsPage] = useState(8);
    const [data, setData] = useState<DataAbout[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = parseInt(searchParams.get("page") || "1");
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    useEffect(() => {
        BeritaGet()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width < 640) setItemsPage(4);        
            else if (width < 1024) setItemsPage(6);  
            else setItemsPage(8);                    
        };

        updateItemsPerPage(); // Initial check
        window.addEventListener("resize", updateItemsPerPage);

        // Cleanup listener
        return () => {
            window.removeEventListener("resize", updateItemsPerPage);
        };
    }, []);
    const goToPage = (page: number) => {
        router.push(`?page=${page}`);
    };

    return (
        <div className="w-full container flex flex-col items-center justify-center mx-auto">
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2 flex-wrap">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 bg-gray-300 rounded hover:bg-teal-600 ${currentPage === 1 ? "opacity-50 hover:bg-gray-300" : ""
                            }`}
                    >
                        <ChevronLeft className="h-6 w-6 flex mx-auto mt-1 text-gray-800" />
                    </button>
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-3 py-1 rounded ${currentPage === page
                                    ? "bg-blue-600 text-white font-bold"
                                    : "bg-gray-300 hover:bg-teal-600 "
                                    }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 bg-gray-300 rounded hover:bg-teal-600 ${currentPage === totalPages
                            ? "opacity-50 hover:bg-gray-300"
                            : ""
                            }`}
                    >
                        <ChevronRight className="h-6 w-6 flex mx-auto mt-1 text-gray-800" />
                    </button>
                </div>
            )}
            <div className="lg:w-11/12 w-11/12 flex mx-auto flex-wrap self-center justify-center overflow-hidden gap-4 mt-20 berita-slick">
                {currentData.map((res, loop) => (
                    <Link
                        key={loop}
                        href={`/berita/${res.id}`}
                        className="group w-full sm:w-[40%] lg:w-[30%] xl:w-[24%] h-[470px] rounded-sm bg-white shadow-lg inset-shadow-xs overflow-hidden flex flex-col flex-wrap"
                    >
                        <Image
                            priority
                            className="w-full max-h-56 object-cover object-center"
                            src={res.gambar}
                            alt={res.gambar}
                            width={2000}
                            height={2000}
                        />
                        <span className="mt-4 w-11/12 flex flex-col mx-auto">
                            <p className="font-extralight text-[17px]">Berita</p>
                            <h2 className="text-ellipsis overflow-clip text-nowrap text-[20px] font-extrabold h-8">
                                {res.judul}
                            </h2>
                            <p className="h-[110px] mt-1 text-[18px] overflow-hidden text-ellipsis group-hover:text-blue-400 duration-200">
                                {res.deskripsi}
                            </p>
                            <p className="mt-3 text-[18px] overflow-hidden h-7 text-ellipsis font-bold">
                                {res.created_at?.split("T")[0]}
                            </p>
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
