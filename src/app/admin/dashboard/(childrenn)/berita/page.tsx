"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DataAbout } from "@/app/types/types";
import { BeritaDelete, BeritaGet } from "@/app/api/berita";


export default function BeritaAdmin() {
    const [data, setData] = useState<DataAbout[]>([]);
    useEffect(() => {
        BeritaGet().then((res) => setData(res.data)).catch((err) => console.log(err));
    }, []);
      function DeleteBerita(id: number) {
        BeritaDelete(id)
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
                <h1 className="text-hijau text-4xl font-bold">Berita</h1>
                <Link href={"/admin/dashboard/berita/add"} className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Tambah</Link>
                <div className="mt-5 w-full flex flex-wrap justify-between gap-y-6">
                    {data.map((res, loop) => {
                        return (
                            <div key={loop} className="w-full lg:w-[48%] xl:w-[32%]  min-h-96 shadow-lg rounded-md overflow-hidden">
                                <span className="w-full h-48 overflow-hidden inline-block">
                                    <Image src={`${process.env.NEXT_PUBLIC_BASEURL}/sejarah/${res.gambar}`} alt={res.gambar} width={800} height={800} className=" w-full h-full object-center object-cover"></Image>
                                </span>
                                <h1 className=" w-11/12 flex mx-auto text-xl font-bold mt-2">{res.judul}</h1>
                                <p className="w-11/12 flex mx-auto text-wrap overflow-hidden mt-2 text-ellipsis">{res.deskripsi}</p>
                                <span className="w-11/12 flex mx-auto justify-between items-center">
                                    <p className="text-second text-md">{res.created_at?.split("T")[0]}</p>
                                    <span className="flex gap-4">
                                        <Link className="my-2 py-2 px-4 w-20 text-center bg-blue-600 text-white font-bold rounded-md" href={"/admin/dashboard/berita/1"}>Edit</Link>
                                        <button onClick={() => DeleteBerita(res.id)} className="my-2 py-2 px-4 w-20 text-center bg-red-600 text-white font-bold rounded-md">Hapus</button>
                                    </span>
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}