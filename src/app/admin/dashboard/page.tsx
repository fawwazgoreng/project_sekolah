"use client"
import Image from "next/image";
import { UploadPage } from "@/app/component/inputfile";
import { useEffect, useState } from "react";
import { DataAbout } from "@/app/types/types";
import { SlideDelete, SlideGet } from "@/app/api/slide";

export default function DashboardPage() {
  const [slide , setSlide] = useState<DataAbout[]>([]);
  useEffect(() => {
    SlideGet().then((res) => setSlide(res.data)).catch((err) => console.log(err));
  }, [])

function deleteSlide(id: number) {
  SlideDelete({ id })
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
        <h1 className="text-hijau text-4xl font-bold">Slide</h1>
        <UploadPage />
        <span className="w-full flex-col lg:flex-row flex flex-wrap justify-around items-center gap-y-7">
      {slide.map((res) => {
        return (
            <span key={res.id} className=" w-full overflow-hidden rounded-md lg:w-[45%] lg:max-w-[900px] ">
            <Image className="w-full xl:h-72 h-56 object-cover object-center" src={`${process.env.NEXT_PUBLIC_BASEPICTURE}${res.gambar}`} priority={true} alt={res.gambar} width={800} height={800}></Image>
            <button onClick={() => deleteSlide(res.id)} className="my-2 py-2 px-4 w-20 text-center bg-red-600 text-white font-bold rounded-md">Hapus</button>
          </span>
        )
      })}
        </span>
      </div>
    </>
  )
}