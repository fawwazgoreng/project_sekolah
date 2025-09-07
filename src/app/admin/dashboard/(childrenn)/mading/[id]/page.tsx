"use client"
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function AddMadingAdmin() {
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };
  return (
    <div className="w-5/6 gap-5 flex mx-auto flex-col">
      <form action="" className="flex w-full flex-col gap-7">
        <span className="flex gap-2 flex-col">
          <label className="text-2xl font-bold" htmlFor="judul">judul</label>
          <input className="border-slate-500 outline-slate-500 bg-slate-100 p-2" type="text" id="judul" name="judul" />
        </span>
        <span className="flex gap-2 flex-col">
          <label htmlFor="gambar" className="px-3 py-2 rounded-md cursor-pointer bg-blue-500 w-56 text-xl font-bold text-center text-white">tambah gambar</label>
          <input className="border-none outline-none bg-slate-100 hidden" id="gambar" type="file" name="gambar" defaultValue={""} accept="image/*" onChange={(e) => handleFileChange(e)} />
          {preview ? <Image src={preview || "/placeholder.png"} alt="" className="w-full max-h-[500px] object-center object-cover" width={800} height={800}></Image> : <div className="w-full h-[500px] object-center object-cover"></div>}
        </span>
        <span className="flex gap-2 flex-col">
          <label className="text-2xl font-bold" htmlFor="desc">Description</label>
          <textarea name="desc" id="desc" className=" resize-none border-none outline-none border-slate-500 outline-slate-500 w-full min-h-96 p-2 bg-slate-100" defaultValue={`
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vero incidunt rem iste molestias ducimus aliquam quam necessitatibus porro sint minima quasi unde culpa nihil neque odio possimus, alias fugit laudantium eos, doloribus eius mollitia. Dolore repudiandae tempora est laudantium illo, odio obcaecati quidem fugiat consectetur enim eos numquam magnam molestias possimus quos sit maxime culpa unde fugit sint recusandae harum quod! Reiciendis voluptates quod aut error libero, tempore molestiae exercitationem nisi ea unde ipsum cupiditate pariatur, natus eveniet repellat commodi blanditiis hic, modi dignissimos quaerat mollitia amet! Accusamus beatae veritatis incidunt recusandae consectetur ex minima numquam dolore veniam in?
                    `}>
          </textarea>
        </span>
        <button className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Submit</button>
      </form>
    </div>
  )
}