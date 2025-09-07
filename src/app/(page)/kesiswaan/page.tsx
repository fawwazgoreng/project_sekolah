"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { DataAbout } from "@/app/types/types";
import { KesiswaanGet } from "@/app/api/kesiswaan";

export default function Gallery() {
    const [data, setData] = useState<DataAbout[]>([]);
    useEffect(() => {
        KesiswaanGet().then((res) => setData(res.data)).catch((err) => console.log(err));
    }, []);
    console.log(data)
    return (
        <div className="container-fluid">
            <div className="w-11/12 md:w-5/6 flex mx-auto flex-wrap justify-center items-center gap-4 ">
                {data.map((res, loop) => {
                    return (
                        <div key={loop} className="lg:w-[30%] xl:w-[23%] sm:w-[48%] w-full group relative overflow-hidden rounded-lg">
                            <Image src={`${process.env.NEXT_PUBLIC_BASEURL}/${res.gambar}`} alt={res.gambar} width={800} height={800} className="group-hover:blur-sm duration-500" />
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