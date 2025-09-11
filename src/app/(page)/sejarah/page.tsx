"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { SejarahGet } from "@/app/api/sejarah";
import { DataAbout } from "@/app/types/types";

export default function Sejarah() {
    const [data, setData] = useState<DataAbout[]>([]);
    useEffect(() => {
        SejarahGet().then((res) => setData(res.data)).catch((err) => console.log(err));
    }, [])
    console.log(data)
    return (
        <>
            {data.map((item, loop) => {
                if (loop === 0) {
                    return (
                        <div key={item.id} className="w-5/6 md:w-11/12 flex flex-col mx-auto h-auto">
                            <p className="text-hijau  font-bold text-[24px] md:text-[32px]"><span className="underline decoration-[7px] underline-offset-[10px]">Seja</span>rah</p>
                            <div className=" mt-10 w-full shadow-xl h-auto overflow-hidden rounded-lg flex flex-col lg:gap-10 gap-5 lg:flex-row">
                                <Image className="w-full lg:w-1/2 object-cover object-center" alt={item.gambar} src={`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/${item.gambar}`} width={800} height={800}></Image>
                                <article className=" text-black text-left text-wrap lg:w-1/2 text-[20px]">
                                    <p className="text-[20px] lg:mt-5 md:text-[22px] p-2 flex flex-col">
                                        <span className="font-bold text-[22px] md:text-[24px]">{item.judul} </span> {item.deskripsi} </p>
                                </article>
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )
}