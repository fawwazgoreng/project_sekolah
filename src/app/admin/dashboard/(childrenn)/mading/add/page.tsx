"use client";
import { KesiswaanAdd } from "@/app/api/kesiswaan";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function AddMadingAdmin() {
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Pilih gambar dulu!");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const result = await KesiswaanAdd({ title: judul, picture: file });
      if (result.status) {
        alert("Mading berhasil ditambahkan!");
        setJudul("");
        setFile(null);
        setPreview("");
        route.push("/admin/dashboard/mading");
      } else {
        alert("Gagal tambah mading");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-5/6 gap-5 flex mx-auto flex-col">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7">
        <span className="flex gap-2 flex-col">
          <label className="text-2xl font-bold" htmlFor="judul">
            Judul
          </label>
          <input
            className="border-slate-500 outline-slate-500 bg-slate-100 p-2"
            type="text"
            id="judul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </span>
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
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              className="w-full max-h-[500px] object-center object-cover"
              width={800}
              height={800}
            />
          ) : (
            <div className="w-full h-[500px] bg-gray-200" />
          )}
        </span>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 flex items-center py-3 w-[100px] h-10 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
          }`}
        >
          {loading ? "..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
