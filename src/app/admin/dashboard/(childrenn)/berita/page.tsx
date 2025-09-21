"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BeritaDelete, BeritaGet } from "@/app/api/berita";
import { DataAbout } from "@/app/types/types";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function BeritaAdmin() {
  const [data, setData] = useState<DataAbout[]>([]);
  const [ITEMS_PER_PAGE, setItemsPage] = useState(6);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null); // ID berita yang sedang dihapus

  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    BeritaGet()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPage(2);
      else if (width < 1024) setItemsPage(4);
      else setItemsPage(6);
    };
    updateItemsPerPage(); // Initial check
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  async function DeleteBerita(id: number) {
    if (!confirm("Apakah yakin ingin menghapus?")) return;

    setLoadingId(id); // lock button yg sedang diproses

    try {
      await BeritaDelete(id);
      alert("Berhasil menghapus Berita!");
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus berita!");
    } finally {
      setLoadingId(null); // lepas lock
    }
  }

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <>
      <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10">
        <h1 className="text-hijau text-4xl font-bold">Berita</h1>
        <Link
          href={"/admin/dashboard/berita/add"}
          className="px-4 flex items-center py-3 w-[100px] h-10 bg-blue-600 text-white rounded"
        >
          Tambah
        </Link>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 bg-gray-300 rounded hover:bg-teal-600 ${
                currentPage === 1 ? "opacity-50 hover:bg-gray-300" : ""
              }`}
            >
              <ChevronLeft className="h-6 w-6 flex mx-auto mt-1 text-gray-800" />
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-gray-300 hover:bg-teal-600 "
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 bg-gray-300 rounded hover:bg-teal-600 ${
                currentPage === totalPages
                  ? "opacity-50 hover:bg-gray-300"
                  : ""
              }`}
            >
              <ChevronRight className="h-6 w-6 flex mx-auto mt-1 text-gray-800" />
            </button>
          </div>
        )}

        {/* List Berita */}
        <div className="mt-5 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentData.map((res, loop) => {
            return (
              <div
                key={loop}
                className="w-full shadow-lg rounded-md overflow-hidden"
              >
                <div className="w-full h-56  overflow-hidden">
                  <Image
                    priority
                    src={`${res.gambar}`}
                    alt={res.gambar}
                    width={800}
                    height={800}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h1 className="w-11/12 flex mx-auto text-xl font-bold mt-2">
                  {res.judul}
                </h1>
                <p className="w-11/12 flex h-[72px] mx-auto text-wrap overflow-hidden mt-2 text-ellipsis line-clamp-3">
                  {res.deskripsi}
                </p>
                <span className="w-11/12 flex mx-auto justify-between items-center">
                  <p className="text-second text-md">
                    {res.created_at?.split("T")[0]}
                  </p>
                  <span className="flex gap-4">
                    <Link
                      className="my-2 py-2 px-4 w-20 text-center bg-blue-600 text-white font-bold rounded-md"
                      href={`/admin/dashboard/berita/${res.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => DeleteBerita(res.id)}
                      disabled={loadingId === res.id}
                      className={`my-2 py-2 px-4 w-20 text-center font-bold rounded-md ${
                        loadingId === res.id
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      {loadingId === res.id ? "Proses..." : "Hapus"}
                    </button>
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
