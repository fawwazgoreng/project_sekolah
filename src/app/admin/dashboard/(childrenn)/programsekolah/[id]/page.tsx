"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { programsekolahGetId, programsekolahEdit } from "@/app/api/programsekolah";
import { DataAbout } from "@/app/types/types";

export default function EditProgramSekolah() {
  const router = useRouter();
  const params = useParams();
  const id = params.id ? Number(params.id) : null;

  const [data, setData] = useState<DataAbout | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
    if (!id) return;

    programsekolahGetId(id).then((res) => {
      if (res.status) {
        setData(res.data);
        // gambar dari backend
        if (res.data.gambar) {
          setPreview(`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/programsekolah/${res.data.gambar}`);
        }
      } else {
        alert("Data tidak ditemukan");
        router.push("/admin/dashboard/programsekolah");
      }
    });
  }, [id, router]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // buat object URL
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  // cleanup URL agar tidak bocor
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data || !id) return;

    const target = e.target as typeof e.target & {
      judul: { value: string };
      desc: { value: string };
    };

    const result = await programsekolahEdit({
      id,
      title: target.judul.value || data.judul,
      desc: target.desc.value || data.deskripsi,
      picture: file ?? undefined,
    });

    if (result.status) {
      alert("Program Sekolah berhasil diupdate!");
      router.push("/admin/dashboard/programsekolah");
    } else {
      alert(result.message || "Gagal update Program Sekolah. Cek kembali form.");
    }
  };

  if (!mounted || !data) return null;

  return (
    <div className="w-5/6 mx-auto flex flex-col gap-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
        {/* Judul */}
        <span className="flex flex-col gap-2">
          <label htmlFor="judul" className="text-2xl font-bold">
            Judul
          </label>
          <input
            id="judul"
            name="judul"
            type="text"
            defaultValue={data.judul}
            className="p-2 border-slate-500 outline-slate-500 bg-slate-100"
          />
        </span>

        {/* Gambar */}
        <span className="flex flex-col gap-2">
          <label
            htmlFor="gambar"
            className="px-3 py-2 w-56 text-center text-xl font-bold text-white bg-blue-500 rounded-md cursor-pointer"
          >
            Ubah Gambar
          </label>
          <input
            id="gambar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {preview ? (
            <div className="relative w-full h-[500px]">
              <Image
                key={preview}
                src={preview}
                alt="preview"
                fill
                priority
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-[500px] bg-gray-100">
              <span className="text-gray-500">No image selected</span>
            </div>
          )}
        </span>

        {/* Description */}
        <span className="flex flex-col gap-2">
          <label htmlFor="desc" className="text-2xl font-bold">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            defaultValue={data.deskripsi}
            className="w-full min-h-[24rem] p-2 bg-slate-100 border-none outline-none resize-none"
          />
        </span>

        {/* Submit */}
        <button
          type="submit"
          className="w-[100px] h-10 px-4 py-3 text-white bg-blue-600 rounded flex items-center justify-center"
        >
          Update
        </button>
      </form>
    </div>
  );
}
