"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { KesiswaanGetId , KesiswaanUpdate } from "@/app/api/kesiswaan";
import { DataAbout } from "@/app/types/types";

export default function EditMadingAdmin() {
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
    KesiswaanGetId(id).then((res) => {
        setData(res.data);
        setPreview(`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/kesiswaan/${res.data.gambar}`);
    });
  }, [id, router]);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data || !id) return;
    const target = e.target as typeof e.target & {
      judul: { value: string };
      desc: { value: string };
    };
    const formData = new FormData();
    formData.append("judul", target.judul.value || data.judul);
    if (file) formData.append("gambar", file);
    const result = await KesiswaanUpdate(id, formData);
    if (result.status) {
      alert("Mading updated successfully!");
      router.push("/admin/dashboard/mading");
    } else {
      alert(result.message || "Failed to update mading.");
    }
  };
  if (!mounted || !data) return null;

  return (
    <div className="w-5/6 mx-auto flex flex-col gap-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
        <span className="flex flex-col gap-2">
          <label htmlFor="judul" className="text-2xl font-bold">Judul</label>
          <input
            id="judul"
            name="judul"
            type="text"
            defaultValue={data.judul}
            className="p-2 border-slate-500 outline-slate-500 bg-slate-100"
          />
        </span>
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
            <div className="relative w-full min-h-52">
              <Image
              className="object-cover object-center"
                key={preview}
                src={preview}
                alt="preview"
                width={800}
                height={800}

                unoptimized
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-[500px] bg-gray-100">
              <span className="text-gray-500">No image selected</span>
            </div>
          )}
        </span>
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
