"use client"
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function AddBeritaAdmin() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    const target = e.target as typeof e.target & {
      judul: { value: string };
      desc: { value: string };
      tanggal: { value: string };
    };

    formData.append("judul", target.judul.value);
    formData.append("deskripsi", target.desc.value);
    formData.append("tanggal", target.tanggal.value);
    formData.append("gambar", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/berita`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      alert("Berita added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add berita.");
    }
  };

  if (!mounted) return null; // Prevent SSR issues

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
            defaultValue=""
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
            <Image
              src={preview}
              alt="preview"
              className="w-full max-h-[500px] object-center object-cover"
              width={800}
              height={800}
            />
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
          />
        </span>

        {/* Modern Date Input */}
        <span className="flex gap-2 flex-col w-64">
          <label className="text-xl font-semibold" htmlFor="tanggal">
            Tanggal
          </label>
          <div className="relative">
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </span>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 flex items-center py-3 w-[100px] h-10 bg-blue-600 text-white rounded"
        >
          Tambah
        </button>
      </form>
    </div>
  );
}
