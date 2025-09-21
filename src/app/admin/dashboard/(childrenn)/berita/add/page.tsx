"use client"
import { BeritaAdd } from "@/app/api/berita";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";

export default function AddBeritaAdmin() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (preview) URL.revokeObjectURL(preview);
      const objectUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreview(objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleReset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    setIsSubmitting(true);
    const formData = new FormData();
    const target = e.target as typeof e.target & {
      judul: { value: string };
      desc: { value: string };
    };

    formData.append("judul", target.judul.value);
    formData.append("deskripsi", target.desc.value);
    formData.append("gambar", file);

    try {
      const res = await BeritaAdd(formData);
      console.log(res);
      alert("Berhasil menambah Berita!");
      router.push("/admin/dashboard/berita");
    } catch (err) {
      console.error(err);
      alert("Gagal menambah berita.");
    } finally {
      setIsSubmitting(false); // release button
    }
  };

  return (
    <div className="w-5/6 gap-5 flex mx-auto flex-col">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7">
        {/* Judul */}
        <span className="flex gap-2 flex-col">
          <label className="text-2xl font-bold" htmlFor="judul">
            Judul
          </label>
          <input
            className="border-slate-500 outline-slate-500 bg-slate-100 p-2"
            type="text"
            id="judul"
            name="judul"
            required
          />
        </span>

        {/* Gambar */}
        <span className="flex gap-2 flex-col">
          <label
            htmlFor="gambar"
            className="px-3 py-2 rounded-md cursor-pointer bg-blue-500 w-56 text-xl font-bold text-center text-white"
          >
            Tambah Gambar
          </label>
          <input
            id="gambar"
            type="file"
            name="gambar"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {preview ? (
            <div className="relative w-full max-h-[500px]">
              <Image
                src={preview}
                alt="preview"
                className="w-full max-h-[500px] object-center object-cover"
                width={800}
                height={800}
              />
              <button
                type="button"
                onClick={handleReset}
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          ) : (
            <div className="w-full h-[500px] bg-gray-200" />
          )}
        </span>

        {/* Description */}
        <span className="flex gap-2 flex-col">
          <label className="text-2xl font-bold" htmlFor="desc">
            Description
          </label>
          <textarea
            name="desc"
            id="desc"
            className="resize-none border-none outline-none w-full min-h-96 p-2 bg-slate-100"
            required
          />
        </span>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 flex items-center py-3 w-[120px] h-10 rounded text-white ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Proses..." : "Tambah"}
        </button>
      </form>
    </div>
  );
}
