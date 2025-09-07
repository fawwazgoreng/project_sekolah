"use client"
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BeritaGet } from '@/app/api/berita';
import { BeritaGetId } from '@/app/api/berita';


type DataAbout = {
  id: number;
  gambar: string;
  judul: string;
  deskripsi: string;
  created_at: string | null;
  updated_at: string | null;
};

export default function BeritaDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [data, setData] = useState<DataAbout[]>([]);
    const [berita, setBerita] = useState<DataAbout[]>([]);
    useEffect(() => {
        BeritaGet().then((res) => setData(res.data)).catch((err) => console.log(err));
        BeritaGetId(id).then((res) => setBerita(res.data)).catch((err) => console.log(err));
    }, [id])
    console.log(id);
    console.log(berita)
    return (
        <>
            <div className='mt-5 w-11/12 flex lg:flex-row flex-col mx-auto justify-between'>
                            <div key={berita?.[0]?.id} className=' lg:w-[70%] w-full flex flex-col gap-5'>
                                <h1 className='text-[25px] font-extrabold'>{berita?.[0]?.judul}</h1>
                                <p>{berita?.[0]?.created_at}</p>
                                <Image className='w-full h-auto max-h-[450px] object-cover object-center' src={`${process.env.NEXT_PUBLIC_BASEURL}/${berita?.[0]?.gambar}`} alt='' width={1000} height={1000} ></Image>
                                <p>{berita?.[0]?.deskripsi}</p>
                            </div>
                <div className='lg:w-[27%] w-full flex flex-col mt-10 gap-4  flex-nowrap'>
                    <h1 className=' text-xl font-extrabold '><span className=' decoration-hijau underline-offset-4 underline decoration-4'>Berita</span> lainya</h1>
                    <span className='w-full flex mt-4 gap-y-10 gap-x-4 lg:gap-y-4 flex-wrap lg:flex-col lg:justify-normal justify-center'>
                        {data.map((res, loop) => {
                            if (loop <= 10) {
                                return (
                                    <Link key={loop} href={`/berita/${res.id}`} className='lg:w-full w-[40%]  md:w-[30%] flex lg:flex-row flex-col h-64 lg:h-32 lg:gap-0 gap-2 justify-between '>
                                        <span className='w-full lg:w-[50%] h-32 overflow-hidden rounded-md'>
                                            <Image className='w-full h-32 object-cover object-center hover:scale-125 duration-300' src={`${process.env.NEXT_PUBLIC_BASEURL}/${res.gambar}`} width={800} height={800} alt={res.gambar}></Image>
                                        </span>
                                        <p className='lg:w-[45%] w-full h-32 text-wrap text-[17px] overflow-hidden duration-200 text-ellipsis hover:text-blue-600'>
                                            {res.judul}</p>
                                    </Link>
                                )
                            }
                        })}
                    </span>
                </div>
            </div>
        </>
    )
}