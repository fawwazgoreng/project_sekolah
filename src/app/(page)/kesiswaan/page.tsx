"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { KesiswaanGet } from "@/app/api/kesiswaan";
import { DataAbout } from "@/app/types/types";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";


export default function Gallery() {
        const [itemsPerPage, setItemsPerPage] = useState(12);
        const [data, setData] = useState<DataAbout[]>([]);
        const searchParams = useSearchParams();
        const router = useRouter();
    
        const currentPage = parseInt(searchParams.get("page") || "1", 10);
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentData = data.slice(startIndex, startIndex + itemsPerPage);
    
    useEffect(() => {
        KesiswaanGet().then((res) => setData(res.data)).catch((err) => console.log(err));
    }, []);
        useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width < 640) setItemsPerPage(4);
            else if (width < 1024) setItemsPerPage(6);
            else setItemsPerPage(10);
        };

        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    const goToPage = (page: number) => {
        router.push(`?page=${page}`);
    };
    return (
        <div className="container-fluid">
            
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
            <div className="w-11/12 mt-10 md:w-5/6 flex mx-auto flex-wrap justify-center items-center gap-4 ">
                {currentData.map((res, loop) => {
                    return (
                        <div key={loop} className="lg:w-[30%] xl:w-[23%] sm:w-[48%] w-full group relative overflow-hidden rounded-lg">
                            <Image src={`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/kesiswaan/${res.gambar}`} alt={res.gambar} width={800} height={800} className="group-hover:blur-sm duration-500" />
                            <div className="absolute top-full flex flex-col bg-black opacity-50 font-bold text-white z-10 group-hover:top-0 duration-500 w-full h-0 overflow-hidden group-hover:w-full group-hover:h-full">
                            </div>
                            <div className="absolute top-full w-full mx-auto self-auto text-white z-20 group-hover:top-0 duration-500 h-0 overflow-hidden group-hover:h-full">
                                <span className="flex w-11/12 mx-auto flex-col gap-2 items-center justify-center mt-4">
                                    <h2 className="text-center font-bold">{res.judul}</h2>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}