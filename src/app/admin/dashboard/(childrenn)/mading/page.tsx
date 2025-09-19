"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { KesiswaanDelete, KesiswaanGet } from "@/app/api/kesiswaan";
import { DataAbout } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function MadingAdmin() {
  const [data, setData] = useState<DataAbout[]>([]);
  const [ITEMS_PER_PAGE, setItemsPage] = useState(6);
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    KesiswaanGet()
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
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  async function DeleteMading(id: string) {
    if (!confirm("Apakah yakin ingin menghapus?")) return;
    setLoadingDelete(id);
    try {
      await KesiswaanDelete({ id });
      setData((prev) => prev.filter((item) => String(item.id) !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDelete(null);
    }
  }

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10">
      <h1 className="text-hijau text-4xl font-bold">Mading</h1>
      <Link
        href="/admin/dashboard/mading/add"
        className="px-4 flex items-center py-3 w-[100px] h-10 bg-blue-600 text-white rounded"
      >
        Tambah
      </Link>
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
              currentPage === totalPages ? "opacity-50 hover:bg-gray-300" : ""
            }`}
          >
            <ChevronRight className="h-6 w-6 flex mx-auto mt-1 text-gray-800" />
          </button>
        </div>
      )}
      <div className="mt-5 w-full flex flex-wrap justify-around gap-y-6">
        {currentData.map((res) => (
          <div
            key={res.id}
            className="w-full flex flex-col lg:w-[48%] xl:w-[32%] pb-2 shadow-lg rounded-md overflow-hidden"
          >
            <span className="w-full h-56 overflow-hidden inline-block">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/kesiswaan/${res.gambar}`}
                alt={res.gambar}
                width={800}
                height={800}
                className="duration-300 w-full h-full object-center object-cover"
              />
            </span>
            <h1 className="w-11/12 flex mx-auto text-xl font-bold mt-2">
              {res.judul}
            </h1>
            <span className="w-11/12 flex mx-auto self-end justify-end gap-3 items-center">
              <Link
                className="my-2 py-2 px-4 bg-blue-600 text-white font-bold rounded-md"
                href={`/admin/dashboard/mading/${res.id}`}
              >
                Edit
              </Link>
              <button
                onClick={() => DeleteMading(`${res.id}`)}
                disabled={loadingDelete === `${res.id}`}
                className={`my-2 py-2 px-4 font-bold rounded-md text-white ${
                  loadingDelete === `${res.id}` ? "bg-gray-400" : "bg-red-600"
                }`}
              >
                {loadingDelete === `${res.id}` ? "..." : "Hapus"}
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
