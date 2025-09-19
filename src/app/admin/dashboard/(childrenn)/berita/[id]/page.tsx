"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BeritaGetId, BeritaUpdate } from "@/app/api/berita";
import { DataAbout } from "@/app/types/types";

export default function EditBeritaAdmin() {
  const router = useRouter();
  const params = useParams();
  const id = params.id ? Number(params.id) : null;

  const [data, setData] = useState<DataAbout | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!id) return;

    BeritaGetId(id).then((res) => {
      if (res.status) {
        setData(res.data);
        setPreview(res.data.gambar || null);
      } else {
        alert("Data tidak ditemukan");
        router.push("/admin/dashboard/berita");
      }
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
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data || !id) return;

    setIsSubmitting(true);

    const target = e.target as typeof e.target & {
      judul: { value: string };
      desc: { value: string };
    };

    const formData = new FormData();
    formData.append("judul", target.judul.value || data.judul);
    formData.append("deskripsi", target.desc.value || data.deskripsi);
    if (file) formData.append("gambar", file);

    try {
      const result = await BeritaUpdate(id, formData);

      if (result.status) {
        alert("Berita updated successfully!");
        router.push("/admin/dashboard/berita");
      } else {
        alert(result.message || "Failed to update berita. Check form errors.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saat update berita");
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
          className={`w-[120px] h-10 px-4 py-3 rounded flex items-center justify-center text-white ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
