"use client"
import { VisimisiGet } from "@/app/api/visimisi";
import { useEffect, useState } from "react"
import { VisiMisi } from "@/app/types/types";

export default function VisiMisii() {
    const [data, setData] = useState<VisiMisi[]>([]);
    useEffect(() => {
        VisimisiGet().then((res) => setData(res.data)).catch((err) => console.log(err));
    }, []);
    console.log(data);
    return (
        <>
            {data.map((res, loop) => {
                if (loop === 0) {
                    return (
                        <div key={loop} className=" w-full ">
                            <p className="text-hijau ml-10 font-bold text-[24px] md:text-[32px]">
                                <span className="underline decoration-7 underline-offset-8 ">Visi,</span>Misi,Dan Moto</p>
                            <div className=" flex flex-col flex-wrap justify-around items-center w-5/6 mx-auto mt-35 md:flex-row">
                                <div className=" w-full group md:w-1/2 max-w-[400px] min-h-[350px] md:min-h-[400px] shadow-lg inset-shadow-xs rounded-md group p-4 ">
                                    <p className="font-medium text-[30px] mt-12 text-center group-hover:text-hijau md:text-[44px]">Visi</p>
                                    <article className="text-center lg:mt-10 mt-5 text-wrap font-extralight md:mx-10 mx-4 group-hover:font-bold italic group-hover:not-italic text-black">
                                        <p>“{res.visi}”</p>
                                    </article>
                                </div>
                                <div className=" w-full group md:w-1/2 max-w-[400px] min-h-[350px] md:min-h-[400px] shadow-lg inset-shadow-xs rounded-md group p-4">
                                    <p className="font-medium text-[35px] mt-12 text-center group-hover:text-hijau  md:text-[44px] ">Moto</p>
                                    <article className="text-center lg:mt-10 mt-5 text-wrap font-extralight md:mx-10 mx-4 group-hover:font-bold italic group-hover:not-italic text-black">
                                        <p>“{res.moto}”</p>
                                    </article>
                                </div>
                                <div className="w-full pb-4 group lg:w-2/3 min-h-96 shadow-lg inset-shadow-xs rounded-md group  max-w-[550px] md:mt-20 ">
                                    <p className="font-medium text-[35px] mt-12 text-center group-hover:text-hijau  md:text-[44px]">Misi</p>
                                    <article className="text-start lg:mt-10 mt-5 text-wrap font-extralight md:mx-10 mx-4 group-hover:font-bold italic group-hover:not-italic text-black">
                                        <p>“{res.misi}”</p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )
}