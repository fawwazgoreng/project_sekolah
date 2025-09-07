"use client"
import { DataAbout } from "@/app/types/types";
import Sejarah from "../../sejarah/page"
import Image from "next/image";
import { useEffect, useState } from "react";
import { AboutExtraGet, AboutFasilitasGet, AboutprogramGet } from "@/app/api/about";

export default function Profil() {
    const [fasilitas , setFasilitas] = useState<DataAbout[]>([]);
    const [extra , setExtra] = useState<DataAbout[]>([]);
    const [program , setProgram] = useState<DataAbout[]>([]);
    useEffect(() => {
        AboutFasilitasGet().then((res) => setFasilitas(res.data)).catch((err) => console.log(err));
        AboutExtraGet().then((res) => setExtra(res.data)).catch((err) => console.log(err));
        AboutprogramGet().then((res) => setProgram(res.data)).catch((err) => console.log(err));
    }, [])
    return (
        <>
            <Sejarah />
            <div className="w-full h-44 bg-transparent"></div>
            <div className="w-5/6 md:w-11/12 flex gap-8 flex-col mx-auto">
                <p className="text-hijau  font-bold text-[24px] md:text-[32px]"><span className="underline decoration-[7px] underline-offset-[10px]">Fasi</span>litas</p>
                <div className="flex flex-wrap w-full justify-center mx-auto gap-4">
                    {fasilitas.map((res , loop) => {
                        return (
                        <span key={loop} className="border-black lg:w-[32%] justify-between h-72 lg:h-80 sm:w-[45%] w-full max-w-[500px]">
                        <div className="w-full h-52 lg:h-64 overflow-hidden rounded-md">
                            <Image src={`${process.env.NEXT_PUBLIC_BASEURL}/${res.gambar}`} alt={res.gambar} className="w-full h-52 lg:h-64 object-cover hover:scale-125 duration-500 object-center" />
                        </div>
                        <p className="text-center text-xl mt-2 font-bold text-hijau">{res.judul}</p>
                    </span>
                        )
                    })}
                </div>
            </div>
            <div className="w-full h-44 bg-transparent"></div>
            <div className="w-5/6 md:w-11/12 flex gap-8 flex-col mx-auto">
            <h1 className="text-center w-full text-3xl font-bold text-hijau underline decoration-[5px] underline-offset-[10px]">pengembangan diri</h1>
            <div className="w-full flex flex-wrap gap-y-24 justify-between">
                <span className="md:w-[43%] w-full">
                    <h1 className="text-2xl pb-5">Extrakulikuner : </h1>
                    <ol type="1" className="text-lg">
                        {extra.map((res) => {
                            return (
                                <li key={res.id}>{res.judul}</li>
                            )
                        })}
                    </ol>
                </span>
                <span className="md:w-[43%] w-full">
                    <h1 className="text-2xl pb-5">program pembelajaran : </h1>
                    <ol type="1" className="text-lg">
                        {program.map((res) => {
                            return (
                                <li key={res.id}>{res.judul}</li>
                            )
                        })}
                    </ol>
                </span>
            </div>
            </div>
        </>
    )
}