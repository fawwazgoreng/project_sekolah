'use client';

import { PrestasiGet } from "@/app/api/prestasi";
import { DataAbout } from "@/app/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Wkk from "@/public/wkk.jpeg";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Prestasi() {
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [data, setData] = useState<DataAbout[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        PrestasiGet()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width < 640) setItemsPerPage(4);
            else if (width < 1024) setItemsPerPage(6);
            else setItemsPerPage(8);
        };
        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    const goToPage = (page: number) => {
        router.push(`?page=${page}`);
    };

    return (
        <div className="w-full h-auto relative overflow-hidden">
            <div className="fixed inset-0 -z-10">
                <Image
                    src={Wkk}
                    alt="Background"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 lg:w-[95%] w-11/12 mx-auto flex flex-col gap-7 text-white pb-20">
                <p className="text-hijau font-bold text-[24px] md:text-[32px]">
                    <span className="underline decoration-[7px] underline-offset-[8px] text-white">
                        Prestasi
                    </span>
                </p>
                <p className="font-bold sm:text-[18px] text-[16px] md:text-[24px]">
                    SMK Wikrama 1 Jepara memiliki sejumlah prestasi yang membanggakan,
                    baik di bidang akademik maupun non-akademik. Beberapa prestasi yang
                    menonjol antara lain
                </p>
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
                {/* Data Cards */}
                <div className="flex flex-row gap-y-20 flex-wrap justify-between w-full">
                    {currentData.map((res, loop) => (
                        <div
                            key={loop}
                            className="bg-white/90 text-black max-w-full w-[49%] overflow-hidden md:flex-row justify-center shadow-lg inset-shadow-xs rounded-[14px] flex flex-col gap-5 pr-2"
                        >
                            <Image
                                className="md:rounded-[14px] object-cover object-center w-full md:w-1/2 xl:w-[35%] h-auto"
                                src={`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/prestasi/${res.gambar}`}
                                width={800}
                                height={800}
                                alt={res.gambar}
                            />
                            <div className="w-11/12 flex flex-col mx-auto md:w-1/2 lg:w-2/3 mt-3">
                                <article className="w-full text-wrap flex flex-col gap-2 md:gap-1 lg:gap-2">
                                    <p className="font-extrabold text-[20px]">{res.judul}</p>
                                    <p className="font-light md:text-[15px] lg:text-[17px]">
                                        {res.deskripsi}
                                    </p>
                                </article>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
