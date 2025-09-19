"use client";

import Image from "next/image";
import { useEffect, useState, ChangeEvent } from "react";
import { AboutGet, AboutEdit, AboutAdd } from "@/app/api/about";
import { DataAbout } from "@/app/types/types";

export default function AboutAdmin() {
  const [data, setData] = useState<DataAbout[]>([]);
  const [previewImages, setPreviewImages] = useState<{ [key: number]: string }>({});
  const [newData, setNewData] = useState<{ judul: string; deskripsi: string; gambar?: File }>({
    judul: "",
    deskripsi: "",
  });
  const [loadingId, setLoadingId] = useState<number | null>(null); // track edit / upload
  const [isSaving, setIsSaving] = useState(false); // track create new

  useEffect(() => {
    AboutGet()
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = async (
    id: number,
    newJudul?: string,
    newDeskripsi?: string,
    newFile?: File
  ) => {
    const item = data.find((d) => d.id === id);
    if (!item) return;
    const judul = newJudul ?? item.judul;
    const deskripsi = newDeskripsi ?? item.deskripsi;

    try {
      setLoadingId(id);
      const res = await AboutEdit({ id, judul, deskripsi, gambar: newFile });
      if (!res.status) throw new Error("Gagal update about sekolah");
      setData((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, judul, deskripsi, gambar: res.data.gambar || d.gambar } : d
        )
      );
      if (newFile) {
        setPreviewImages((prev) => {
          const newPrev = { ...prev };
          delete newPrev[id];
          return newPrev;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleFileChange = async (id: number, e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setPreviewImages((prev) => ({ ...prev, [id]: previewUrl }));
    const item = data.find((d) => d.id === id);
    if (!item) return;

    try {
      setLoadingId(id);
      const res = await AboutEdit({ id, judul: item.judul, deskripsi: item.deskripsi, gambar: file });
      if (res.status) {
        alert("Berhasil update about sekolah");
        setData((prev) =>
          prev.map((d) => (d.id === id ? { ...d, gambar: res.data.gambar || d.gambar } : d))
        );
        URL.revokeObjectURL(previewUrl);
        setPreviewImages((prev) => {
          const newPrev = { ...prev };
          delete newPrev[id];
          return newPrev;
        });
      } else {
        console.error("Gagal update about sekolah");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleCreateNew = async () => {
    if (!newData.judul || !newData.deskripsi || !newData.gambar) {
      alert("Semua data harus diisi.");
      return;
    }
    setIsSaving(true);
    try {
      const res = await AboutAdd({
        judul: newData.judul,
        deskripsi: newData.deskripsi,
        gambar: newData.gambar,
      });
      if (res.status) {
        alert("Berhasil menambahkan about sekolah");
        setData([res.data]);
        setNewData({ judul: "", deskripsi: "" });
      } else {
        alert("Gagal menambahkan about sekolah");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center p-4">
      <h1 className="text-hijau text-4xl font-bold mb-6">About our school</h1>
      {data.length > 0 ? (
        data.map((res) => (
          <div key={res.id} className="mb-8">
            <input
              type="text"
              defaultValue={res.judul}
              disabled={loadingId === res.id}
              onBlur={(e) => handleEdit(res.id, e.target.value, res.deskripsi)}
              className="p-2 my-3 text-2xl text-hijau font-bold w-full border border-gray-300 rounded disabled:bg-gray-100"
            />
            <div className="flex flex-col lg:flex-row gap-4 shadow-lg rounded-md p-4">
              <div className="w-full lg:w-1/2 h-96 relative rounded-md overflow-hidden">
                <Image
                  src={
                    previewImages[res.id]
                      ? previewImages[res.id]
                      : `${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/${res.gambar}`
                  }
                  priority
                  alt={res.judul}
                  className="object-cover rounded-md"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized={!!previewImages[res.id]}
                />
                <input
                  type="file"
                  accept="image/*"
                  disabled={loadingId === res.id}
                  onChange={(e) => handleFileChange(res.id, e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
              </div>
              <textarea
                defaultValue={res.deskripsi}
                disabled={loadingId === res.id}
                onBlur={(e) => handleEdit(res.id, res.judul, e.target.value)}
                placeholder="about sekolah..."
                className="p-2 w-full min-h-40 text-[15px] md:text-[20px] text-black font-light shadow-inner rounded resize-none border border-gray-300 disabled:bg-gray-100"
              />
            </div>
          </div>
        ))
      ) : (
        <div className="mb-8">
          <input
            type="text"
            value={newData.judul}
            onChange={(e) => setNewData((prev) => ({ ...prev, judul: e.target.value }))}
            placeholder="Nama Sekolah"
            className="p-2 my-3 text-2xl text-hijau font-bold w-full border border-gray-300 rounded"
          />
          <div className="flex flex-col lg:flex-row gap-4 shadow-lg rounded-md p-4">
            <div className="w-full lg:w-1/2 h-96 relative rounded-md overflow-hidden bg-gray-100">
              {newData.gambar ? (
                <Image
                  src={URL.createObjectURL(newData.gambar)}
                  alt="Preview"
                  className="object-cover rounded-md"
                  fill
                  unoptimized
                />
              ) : (
                <p className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Pilih gambar
                </p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, gambar: e.target.files?.[0] }))
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <textarea
              value={newData.deskripsi}
              onChange={(e) => setNewData((prev) => ({ ...prev, deskripsi: e.target.value }))}
              placeholder="Deskripsi sekolah..."
              className="p-2 w-full min-h-40 text-[15px] md:text-[20px] text-black font-light shadow-inner rounded resize-none border border-gray-300"
            />
          </div>
          <button
            onClick={handleCreateNew}
            disabled={isSaving}
            className={`mt-4 px-6 py-2 rounded text-white ${
              isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Menyimpan..." : "Simpan About school"}
          </button>
        </div>
      )}
    </div>
  );
}
