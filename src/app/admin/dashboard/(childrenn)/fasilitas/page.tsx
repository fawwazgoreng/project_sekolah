"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Wkk from "@/public/wkk.jpeg";

export default function DashboardAboutPage() {
  const [preview, setPreview] = useState<string>("");
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };
  const [pupUpActiv, setPupUpActiv] = useState(false);
  const [pupUpEditActiv, setPupEditUpActiv] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  function PopUp() {
    return (
      <>
        <div className="w-full h-full fixed bg-slate-300 opacity-40 left-0 top-0">
        </div>
        <div className="flex flex-col p-3 gap-3 z-20 fixed bg-slate-50 w-auto h-auto left-[10%] rounded-lg bottom-[5%] right-[10%] top-[5%]">
          <button
            className="w-10 h-10 md:top-2 md:right-2 top-3 right-3 absolute z-50"
            onClick={() => setPupUpActiv(false)}
          >
            <span className="w-full h-full">
              <span className="w-7 h-0.5 rounded-full -right-3 absolute rotate-45 bg-black"></span>
              <span className="w-7 h-0.5 rounded-full -right-3 absolute -rotate-45 bg-black"></span>
            </span>
          </button>
          <label htmlFor="nama" className="mt-4">nama</label>
          <input type="text" id="nama" name="nama" className="w-full bg-slate-300  border-none outline-none rounded-md p-2" />
          <label htmlFor="gambar" className="text-white cursor-pointer w-56 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">upload gambar</label>
          {preview ? <Image src={preview} alt="" width={2000} height={2000} className="w-full min-h-96 max-h-[500px] object-cover object-center"></Image> :
            <div className="w-full min-h-96 max-h-[500px] object-cover object-center"></div>}
          <input type="file" id="gambar" onChange={(e) => handleFileChange(e)} className="hidden" />
          <button className="text-white cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">Submit</button>
        </div>
      </>
    )
  }
  function PopUpEdit() {
    console.log("test");
    return (
      <>
        <div className="w-full h-full fixed bg-slate-300 opacity-40 left-0 top-0">
        </div>
        <div className="flex flex-col p-3 gap-3 z-20 fixed bg-slate-50 w-auto h-auto left-[10%] rounded-lg bottom-[5%] right-[10%] top-[5%]">
          <button
            className="w-10 h-10 md:top-2 md:right-2 top-3 right-3 absolute z-50"
            onClick={() => setPupEditUpActiv(false)}
          >
            <span className="w-full h-full">
              <span className="w-7 h-0.5 rounded-full -right-3 absolute rotate-45 bg-black"></span>
              <span className="w-7 h-0.5 rounded-full -right-3 absolute -rotate-45 bg-black"></span>
            </span>
          </button>
          <label htmlFor="nama" className="mt-4">nama</label>
          <input type="text" id="nama" name="nama" className="w-full bg-slate-300  border-none outline-none rounded-md p-2" />
          <label htmlFor="gambar" className="text-white cursor-pointer w-56 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">edit gambar</label>
          {preview ? <Image src={preview} alt="" width={2000} height={2000} className="w-full min-h-96 max-h-[500px] object-cover object-center"></Image> :
            <div className="w-full min-h-96 max-h-[500px] object-cover object-center"></div>}
          <input type="file" id="gambar" onChange={(e) => handleFileChange(e)} className="hidden" />
          <button className="text-white cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">Submit</button>
        </div>
      </>
    )
  }
  function DeleteFasili(id: number) {
    console.log(id);
  }
  // function EditFasili () {

  // }
  console.log(status);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin")
    }
  }, [router, status]);
  return (
    <>
      {pupUpActiv ? <PopUp /> : <></>}
      {pupUpEditActiv ? <PopUpEdit /> : <></>}
      <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10 ">
        <h1 className="text-hijau text-4xl font-bold">Fasilitas</h1>
        <div className="flex gap-5">
          <button onClick={() => setPupUpActiv(true)} className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Tambah</button>
        </div>
        <div className="w-full flex flex-col justify-between gap-10">
          <span className="w-full flex-col lg:flex-row flex flex-wrap justify-around items-center gap-y-7">
            <div className="group w-full lg:w-[45%] flex mx-auto flex-col items-start">
              <span className="inline-block overflow-hidden rounded-md w-full md:max-w-[900px] xl:h-72 h-56">
                <Image className="w-full h-full hover:scale-110 duration-300 object-cover object-center" src={Wkk} alt="" width={800} height={800}></Image>
              </span>
              <span className="w-full flex justify-between py-5">
                <h1 className="text-2xl text-hijau font-bold group-hover:translate-x-4 group-hover:scale-105 duration-300">ytta</h1>
                <span className="flex justify-center gap-5">
                  <button onClick={() => setPupEditUpActiv(true)} className="py-2 px-4 bg-blue-600 rounded-md w-20 text-white font-bold">Edit</button>
                  <button onClick={() => DeleteFasili(1)} className="py-2 px-4 bg-red-600 rounded-md w-20 text-white font-bold">Hapus</button>
                </span>
              </span>
            </div>
          </span>
        </div>
      </div>
    </>
  )
}