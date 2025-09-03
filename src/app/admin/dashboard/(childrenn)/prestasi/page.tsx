"use client"
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Wkk from "@/public/wkk.jpeg";

export default function PrestasiAdmin() {
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
    function PopUp() {
        return (
            <>
                <div className="w-full h-full fixed bg-slate-300 opacity-40 left-0 top-0">
                </div>
                <div className="flex flex-col p-3 gap-3 z-20 fixed bg-slate-50 w-auto h-auto left-0 right-0 top-0 bottom-0 md:left-[10%] rounded-lg md:bottom-[2%] md:right-[10%] md:top-[2%]">
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
                    <label htmlFor="desc" className="mt-4">description</label>
                    <textarea id="desc" name="desc" className="w-full h-28 bg-slate-300  border-none outline-none rounded-md p-2" />
                    <label htmlFor="gambar" className="text-white cursor-pointer w-56 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">upload gambar</label>
                    {preview ? <Image src={preview} alt="" width={2000} height={2000} className="w-auto self-center min-h-72 max-h-72 object-cover object-center"></Image> :
                        <div className="w-auto self-center min-h-72 max-h-72 object-cover object-center"></div>}
                    <input type="file" id="gambar" onChange={(e) => handleFileChange(e)} className="hidden" />
                    <button className="text-white cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">Submit</button>
                </div>
            </>
        )
    }
    function PopUpEdit() {
        return (
            <>
                <div className="w-full h-full fixed bg-slate-300 opacity-40 left-0 top-0">
                </div>
                <div className="flex flex-col p-3 gap-3 z-20 fixed bg-slate-50 w-auto h-auto left-0 right-0 top-0 bottom-0 md:left-[10%] rounded-lg md:bottom-[2%] md:right-[10%] md:top-[2%]">
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
                    <label htmlFor="desc" className="mt-4">description</label>
                    <textarea id="desc" name="desc" className="w-full h-28 bg-slate-300  border-none outline-none rounded-md p-2" />
                    <label htmlFor="gambar" className="text-white cursor-pointer w-56 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">edit gambar</label>
                    {preview ? <Image src={preview} alt="" width={2000} height={2000} className="w-auto self-center min-h-72 max-h-72 object-cover object-center"></Image> :
                        <div className="w-auto self-center min-h-72 max-h-72 object-cover object-center"></div>}
                    <textarea id="desc" name="desc" className="w-full h-28 bg-slate-300  border-none outline-none rounded-md p-2" />
                    <button className="text-white cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">Submit</button>
                </div>
            </>
        )
    }
    return (
        <>
            {pupUpActiv ? <PopUp /> : <></>}
            {pupUpEditActiv ? <PopUpEdit /> : <></>}
            <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10 ">
                <h1 className="text-hijau text-4xl font-bold">Prestasi</h1>
                <button onClick={() => setPupUpActiv(true)} className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Tambah</button>
                <div className="mt-5 w-full flex flex-wrap justify-between gap-y-6">
                    <div className="w-full lg:w-[48%] xl:w-[32%]  min-h-96 shadow-lg rounded-md overflow-hidden">
                        <span className="w-full h-48 overflow-hidden inline-block">
                            <Image src={Wkk} alt="" width={800} height={800} className=" w-full h-full object-center object-cover"></Image>
                        </span>
                        <h1 className=" w-11/12 flex mx-auto text-xl font-bold mt-2">Lorem ipsum dolor sit amet.</h1>
                        <p className="w-11/12 flex mx-auto text-wrap overflow-hidden mt-2 text-ellipsis">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Officia et dolore cupiditate Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, nostrum. assumenda explicabo minima obcaecati odit quas quibusdam recusandae.</p>
                        <span className="w-11/12 flex mx-auto justify-end gap-5 p-2 items-center">
                            <button onClick={() => setPupEditUpActiv(true)} className="py-2 px-4 bg-blue-600 rounded-md w-20 text-white font-bold">Edit</button>
                            <button className="py-2 px-4 bg-red-600 rounded-md w-20 text-white font-bold">Hapus</button>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}