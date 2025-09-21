"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BeritaGet, BeritaGetId } from "@/app/api/berita";
import { DataAbout } from "@/app/types/types";
import { useParams } from "next/navigation";

export default function BeritaDetail() {
    const params = useParams<{ id: string }>();
    const id = Number(params.id);
    const [data, setData] = useState<DataAbout[]>([]);
    const [berita, setBerita] = useState<DataAbout | null>(null);

    useEffect(() => {
        BeritaGet()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));

        BeritaGetId(id)
            .then((res) => setBerita(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div className="mt-5 w-11/12 flex lg:flex-row flex-col mx-auto justify-between">
            {/* Detail berita */}
            <div className="lg:w-[70%] w-full flex flex-col gap-5">
                {berita && (
                    <>
                        <h1 className="text-[25px] font-extrabold">{berita.judul}</h1>
                        <p>{berita.created_at?.split("T")[0]}</p>
                        {berita.gambar && (
                            <Image
                                className="w-full h-auto  object-cover object-center"
                                src={`${berita.gambar}`}
                                alt={berita.judul}
                                width={1000}
                                height={1000}
                                priority
                            />
                        )}
                        <p>{berita.deskripsi}</p>
                    </>
                )}
            </div>

            {/* Berita lain */}
            <div className="lg:w-[27%] w-full flex flex-col mt-10 gap-4 flex-nowrap">
                <h1 className="text-xl font-extrabold">
                    <span className="decoration-hijau underline-offset-4 underline decoration-4">
                        Berita
                    </span>{" "}
                    lainya
                </h1>
                <span className="w-full flex mt-4 gap-y-10 gap-x-4 lg:gap-y-4 flex-wrap lg:flex-col lg:justify-normal justify-center">
                    {data.slice(0, 10).map((res) =>
                        res.id !== id ? (
                            <Link
                                key={res.id}
                                href={`/berita/${res.id}`}
                                className="lg:w-full w-[40%] md:w-[30%] flex lg:flex-row flex-col h-64 lg:h-32 lg:gap-0 gap-2 justify-between"
                            >
                                <span className="w-full lg:w-[50%] h-32 overflow-hidden rounded-md">
                                    <Image priority
                                        className="w-full h-32 object-cover object-center hover:scale-125 duration-300"
                                        src={`${res.gambar}`}
                                        width={800}
                                        height={800}
                                        alt={res.judul}
                                    />
                                </span>
                                <p className="lg:w-[45%] w-full h-32 text-wrap text-[17px] overflow-hidden duration-200 text-ellipsis hover:text-blue-600">
                                    {res.judul}
                                </p>
                            </Link>
                        ) : null
                    )}
                </span>
            </div>
        </div>
    );
}
