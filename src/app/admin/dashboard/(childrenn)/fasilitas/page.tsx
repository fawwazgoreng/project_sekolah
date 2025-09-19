"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  AboutFasilitasAdd,
  AboutFasilitasDelete,
  AboutFasilitasEdit,
  AboutFasilitasGet,
  AboutFasilitasGetid,
} from "@/app/api/about";
import { DataAbout } from "@/app/types/types";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardAboutPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [nama, setNama] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fasilitas, setFasilitas] = useState<DataAbout[]>([]);
  const [fasilitasEdit, setFasilitasEdit] = useState<DataAbout | null>(null);
  const [idEdit, setIdEdit] = useState<number>(0);
  const [popupActive, setPopupActive] = useState(false);
  const [popupEditActive, setPopupEditActive] = useState(false);
  const [ITEMS_PER_PAGE, setItemsPage] = useState(6);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalPages = Math.ceil(fasilitas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = fasilitas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    AboutFasilitasGet()
      .then((res) => setFasilitas(res.data))
      .catch(console.error);

    if (idEdit !== 0) {
      AboutFasilitasGetid(idEdit)
        .then((res) => setFasilitasEdit(res.data))
        .catch(console.error);
    }
  }, [idEdit]);

  useEffect(() => {
    if (popupEditActive && fasilitasEdit) {
      setNama(fasilitasEdit.judul);
      setPreview(
        `${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/${fasilitasEdit.gambar}`
      );
    }
  }, [popupEditActive, fasilitasEdit]);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nama.trim()) return alert("Nama tidak boleh kosong!");
    if (!file) return alert("Silakan pilih gambar!");
    setLoadingAdd(true);
    try {
      const response = await AboutFasilitasAdd({ name: nama, picture: file });
      if (response.status) {
        alert("Upload berhasil!");
        setFile(null);
        setPreview(null);
        setNama("");
        setPopupActive(false);
        AboutFasilitasGet().then((res) => setFasilitas(res.data));
      } else {
        alert("Gagal menambahkan fasilitas");
      }
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fasilitasEdit) return;
    if (!nama.trim()) return alert("Nama tidak boleh kosong!");
    setLoadingEdit(true);
    try {
      const response = await AboutFasilitasEdit({
        id: fasilitasEdit.id,
        judul: nama,
        gambar: file ? file : null,
      });
      if (response.status) {
        alert("Update fasilitas berhasil!");
        setFile(null);
        setPreview(null);
        setNama("");
        setPopupEditActive(false);
        AboutFasilitasGet().then((res) => setFasilitas(res.data));
      } else {
        alert("Update fasilitas gagal!");
      }
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah yakin ingin menghapus?")) return;
    setLoadingDelete(id);
    try {
      await AboutFasilitasDelete(id);
      setFasilitas((prev) => prev.filter((item) => item.id !== id));
      alert("Berhasil menghapus fasilitas");
    } catch {
      alert("Gagal menghapus fasilitas");
    } finally {
      setLoadingDelete(null);
    }
  };

  const goToPage = (page: number) => {
    router.replace(`?page=${page}`);
  };

  return (
    <>
      {popupActive && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-20"
          onClick={() => setPopupActive(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddSubmit}
            className="flex flex-col p-3 gap-3 bg-slate-50 w-auto h-auto max-w-lg rounded-lg relative"
          >
            <button
              type="button"
              className="absolute top-3 right-3 w-10 h-10"
              onClick={() => setPopupActive(false)}
            >
              ✕
            </button>
            <h1 className="text-2xl font-bold text-center">Tambah Fasilitas</h1>
            <label htmlFor="nama" className="mt-4">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full bg-slate-300 border-none outline-none rounded-md p-2"
            />
            <label
              htmlFor="gambar"
              className="text-white cursor-pointer w-56 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center"
            >
              Upload Gambar
            </label>
            <input
              type="file"
              id="gambar"
              onChange={handleFileChange}
              className="hidden"
            />
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={2000}
                height={2000}
                className="w-full min-h-96 max-h-[500px] object-cover object-center"
              />
            ) : (
              <div className="w-full min-h-96 max-h-[500px] bg-gray-200" />
            )}
            <button
              type="submit"
              disabled={loadingAdd}
              className={`text-white cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold text-center ${
                loadingAdd ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              {loadingAdd ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      )}

      {popupEditActive && fasilitasEdit && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-20"
          onClick={() => setPopupEditActive(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleEditSubmit}
            className="flex flex-col p-3 gap-3 bg-slate-50 w-auto h-auto max-w-lg rounded-lg relative"
          >
            <button
              type="button"
              className="absolute top-3 right-3 w-10 h-10"
              onClick={() => setPopupEditActive(false)}
            >
              ✕
            </button>
            <h1 className="text-2xl font-bold text-center">Edit Fasilitas</h1>
            <label htmlFor="nama" className="mt-4">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full bg-slate-300 border-none outline-none rounded-md p-2"
            />
            <label
              htmlFor="gambar"
              className="text-white cursor-pointer w-56 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center"
            >
              Edit Gambar
            </label>
            <input
              type="file"
              id="gambar"
              name="gambar"
              onChange={handleFileChange}
              className="hidden"
            />
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={2000}
                height={2000}
                className="w-full min-h-96 max-h-[500px] object-cover object-center"
              />
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/${fasilitasEdit.gambar}`}
                alt={fasilitasEdit.gambar}
                width={2000}
                height={2000}
                className="w-full min-h-96 max-h-[500px] object-cover object-center"
              />
            )}
            <button
              type="submit"
              disabled={loadingEdit}
              className={`text-white cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold text-center ${
                loadingEdit ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              {loadingEdit ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10">
        <h1 className="text-hijau text-4xl font-bold">Fasilitas</h1>
        <div className="flex gap-5">
          <button
            onClick={() => setPopupActive(true)}
            className="px-4 flex items-center py-3 w-[100px] h-10 bg-blue-600 text-white rounded"
          >
            Tambah
          </button>
        </div>
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
        <div className="w-full flex flex-col justify-between gap-10">
          <div className="w-full flex flex-wrap justify-around items-center gap-y-7">
            {currentData.map((item) => (
              <div
                key={item.id}
                className="group w-full lg:w-[45%] flex flex-col mx-auto items-start"
              >
                <span className="inline-block overflow-hidden rounded-md w-full md:max-w-[900px] xl:h-72 h-56">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/${item.gambar}`}
                    alt={item.gambar}
                    priority={true}
                    width={800}
                    height={800}
                    className="w-full h-full hover:scale-110 duration-300 object-cover object-center"
                  />
                </span>
                <span className="w-full flex justify-between py-5">
                  <h1 className="text-2xl h-[72px] line-clamp-3 text-hijau font-bold duration-300">
                    {item.judul}
                  </h1>
                  <span className="flex justify-center items-start gap-5">
                    <button
                      onClick={() => {
                        setIdEdit(item.id);
                        setPopupEditActive(true);
                      }}
                      className="py-2 px-4 bg-blue-600 rounded-md w-20 text-white font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={loadingDelete === item.id}
                      className={`py-2 px-4 rounded-md w-20 text-white font-bold ${
                        loadingDelete === item.id
                          ? "bg-gray-400"
                          : "bg-red-600"
                      }`}
                    >
                      {loadingDelete === item.id ? "..." : "Hapus"}
                    </button>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
