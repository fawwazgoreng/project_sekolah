"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { programsekolahGet, programsekolahDelete } from "@/app/api/programsekolah";
import { DataAbout } from "@/app/types/types";

export default function ProgramSekolahAdmin() {
  const [data, setData] = useState<DataAbout[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    programsekolahGet()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  async function deleteProgram(id: number) {
    if (!confirm("Apakah yakin ingin menghapus?")) return;
    setLoadingId(id);
    try {
      await programsekolahDelete(id);
      alert("Berhasil menghapus program sekolah");
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal menghapus program sekolah");
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10">
      <h1 className="text-hijau text-4xl font-bold">Program Sekolah</h1>
      <Link
        href={"/admin/dashboard/programsekolah/add"}
        className="px-4 flex items-center py-3 w-[100px] h-10 bg-blue-600 text-white rounded"
      >
        Tambah
      </Link>
      <div className="mt-5 w-full flex flex-wrap justify-around gap-6">
        {data.map((res) => (
          <div
            key={res.id}
            className="w-full lg:w-[45%] min-h-96 shadow-lg rounded-md overflow-hidden"
          >
            <span className="w-full h-48 overflow-hidden inline-block">
              <Image
                priority
                src={`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/programsekolah/${res.gambar}`}
                alt={res.gambar}
                width={800}
                height={800}
                className="w-full h-full object-center object-cover"
              />
            </span>
            <h1 className="w-11/12 flex mx-auto text-xl font-bold mt-2">{res.judul}</h1>
            <p className="w-11/12 flex h-[72px] mx-auto overflow-hidden mt-2 text-ellipsis line-clamp-3">
              {res.deskripsi}
            </p>
            <span className="w-11/12 flex mx-auto justify-between items-center">
              <span className="flex gap-4">
                <Link
                  className="my-2 py-2 px-4 w-20 text-center bg-blue-600 text-white font-bold rounded-md"
                  href={`/admin/dashboard/programsekolah/${res.id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProgram(res.id)}
                  disabled={loadingId === res.id}
                  className={`my-2 py-2 px-4 w-20 text-center font-bold rounded-md ${
                    loadingId === res.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 text-white"
                  }`}
                >
                  {loadingId === res.id ? "..." : "Hapus"}
                </button>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
