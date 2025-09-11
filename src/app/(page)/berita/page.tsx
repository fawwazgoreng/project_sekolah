"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DataAbout } from "@/app/types/types";
import { BeritaGet } from "@/app/api/berita";

export default function BeritaNews() {
    const [data , setData] = useState<DataAbout[]>([]);
    useEffect(() => {
        BeritaGet().then((res) => setData(res.data)).catch((err) => console.log(err));
    }, [])
    return (
        <>
            <div className="w-full container flex items-center justify-center mx-auto">
                <div className="lg:w-11/12 w-11/12 flex mx-auto flex-wrap self-center justify-center overflow-hidden gap-4 mt-20 berita-slick">
                    {data.map((res , loop) => {
                        return (
                        <Link key={loop} href={`/berita/${res.id}`} className="group w-full sm:w-[40%] lg:w-[30%] xl:w-[24%] h-[470px] rounded-sm bg-white shadow-lg inset-shadow-xs overflow-hidden flex flex-col flex-wrap">
                        <Image priority className=" w-full max-h-56 relative object-cover object-center " src={res.gambar} alt={res.gambar} width={2000} height={2000}></Image>
                        <span className="mt-4 w-11/12 flex flex-col mx-auto">
                            <p className="font-extralight text-[17px]">Berita</p>
                            <h2 className="text-ellipsis overflow-clip text-nowrap text-[20px] font-extrabold h-8 ">{res.judul}</h2>
                            <p className="h-[110px] mt-1 text-[18px] overflow-hidden text-ellipsis group-hover:text-blue-400 duration-200">{res.deskripsi}</p>
                            <p className="mt-3 text-[18px] overflow-hidden h-7 text-ellipsis font-bold">{res.created_at?.split('T')[0]}</p>
                        </span>
                    </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}