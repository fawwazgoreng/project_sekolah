"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { KesiswaanDelete, KesiswaanGet } from "@/app/api/kesiswaan";
import { DataAbout } from "@/app/types/types";

export default function PrestasiAdmin() {
    const [data, setData] = useState<DataAbout[]>([]);
    useEffect(() => {
        KesiswaanGet().then((res) => setData(res.data)).catch((err) => console.log(err));
    }, []);
    function DeleteMading(id: string) {
        KesiswaanDelete({ id })
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            });
    }
    return (
        <>
            <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10 ">
                <h1 className="text-hijau text-4xl font-bold">Mading</h1>
                <Link href={"/admin/dashboard/mading/add"} className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Tambah</Link>
                <div className="mt-5 w-full flex flex-wrap justify-between gap-y-6">
                    {data.map((res) => {
                        return (
                            <div key={res.id} className="w-full lg:w-[48%] xl:w-[32%]  min-h-96 shadow-lg rounded-md overflow-hidden">
                                <span className="w-full mih-h-48 overflow-hidden inline-block">
                                    <Image src={`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/kesiswaan/${res.gambar}`} alt={res.gambar} width={800} height={800} className="duration-300 w-full h-full object-center object-cover"></Image>
                                </span>
                                <h1 className=" w-11/12 flex mx-auto text-xl font-bold mt-2">{res.judul}</h1>
                                <span className="w-11/12 flex mx-auto justify-end gap-3 items-center">
                                    <Link className="my-2 py-2 px-4 bg-blue-600 text-white font-bold rounded-md" href={`/admin/dashboard/mading/${res.id}`}>edit</Link>
                                    <button onClick={() => DeleteMading(`${res.id}`)} className="my-2 py-2 px-4 bg-red-600 text-white font-bold rounded-md" >Hapus</button>
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}