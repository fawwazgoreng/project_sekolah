"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  PrestasiGet,
  PrestasiAdd,
  PrestasiEdit,
  PrestasiDelete,
  PrestasiGetId,
} from "@/app/api/prestasi";
import { DataAbout } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function PrestasiAdmin() {
  const [prestasi, setPrestasi] = useState<DataAbout[]>([]);
  const [popupAddActive, setPopupAddActive] = useState(false);
  const [popupEditActive, setPopupEditActive] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editPrestasi, setEditPrestasi] = useState<DataAbout | null>(null);
  const [nama, setNama] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [ITEMS_PER_PAGE, setItemsPage] = useState(6);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const fetchPrestasi = () => {
    PrestasiGet()
      .then((res) => setPrestasi(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchPrestasi();
  }, []);

  useEffect(() => {
    if (editId !== null) {
      PrestasiGetId(editId)
        .then((res) => {
          setEditPrestasi(res.data);
          setNama(res.data.judul);
          setDesc(res.data.deskripsi);
          setPreview(
            `${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/prestasi/${res.data.gambar}`
          );
        })
        .catch(console.error);
    }
  }, [editId]);

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

  const totalPages = Math.ceil(prestasi.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = prestasi.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const resetForm = () => {
    setNama("");
    setDesc("");
    setFile(null);
    setPreview(null);
  };

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");
    if (loadingAdd) return;
    setLoadingAdd(true);
    const res = await PrestasiAdd({ title: nama, desc, picture: file });
    setLoadingAdd(false);
    if (res.status) {
      alert("Prestasi berhasil ditambahkan!");
      setPopupAddActive(false);
      resetForm();
      fetchPrestasi();
    } else {
      alert("Gagal menambahkan prestasi");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editPrestasi || loadingEdit) return;
    setLoadingEdit(true);
    const res = await PrestasiEdit({
      id: editId,
      title: nama,
      desc,
      picture: file ? file : undefined,
    });
    setLoadingEdit(false);
    if (res.status) {
      alert("Prestasi berhasil diperbarui!");
      setPopupEditActive(false);
      resetForm();
      setEditPrestasi(null);
      setEditId(null);
      fetchPrestasi();
    } else {
      alert("Gagal memperbarui prestasi");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah yakin ingin menghapus?")) return;
    if (loadingDelete !== null) return;
    setLoadingDelete(id);
    await PrestasiDelete(id)
      .then(() => alert("Berhasil menghapus prestasi"))
      .catch(() => alert("Gagal menghapus prestasi"));
    setLoadingDelete(null);
    fetchPrestasi();
  };

  return (
    <div className="w-11/12 mx-auto mt-10 flex flex-col gap-8">
      {popupAddActive && (
        <div
          className={`fixed inset-0 ${
            popupAddActive ? "flex" : "hidden"
          } bg-slate-300 z-10 justify-center items-center`}
        >
          <form
            onSubmit={handleAddSubmit}
            className="flex flex-col p-5 gap-4 bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 relative"
          >
            <button
              type="button"
              className="absolute top-3 right-3 w-10 h-10 z-50"
              onClick={() => setPopupAddActive(false)}
            >
              <span className="relative w-full h-full">
                <span className="absolute w-7 h-0.5 bg-black rotate-45"></span>
                <span className="absolute w-7 h-0.5 bg-black -rotate-45"></span>
              </span>
            </button>
            <h1 className="text-2xl font-bold text-center">Prestasi</h1>
            <label>Prestasi</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <label>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <label
              htmlFor="gambar"
              className="cursor-pointer px-3 py-2 w-56 text-center bg-blue-600 text-white font-bold rounded-md"
            >
              upload gambar
            </label>
            <input
              type="file"
              id="gambar"
              className="hidden"
              onChange={handleFileChange}
            />
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                width={2000}
                height={2000}
                className="w-full max-h-72 object-cover object-center"
              />
            ) : (
              <div className="w-full max-h-72 bg-gray-200" />
            )}
            <button
              type="submit"
              disabled={loadingAdd}
              className={`px-4 py-2 font-bold rounded-md text-white ${
                loadingAdd
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600"
              }`}
            >
              {loadingAdd ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      )}
      {popupEditActive && (
        <div
          className={`fixed inset-0 ${
            popupEditActive ? "flex" : "hidden"
          } bg-slate-300 z-10 justify-center items-center`}
        >
          <form
            onSubmit={handleEditSubmit}
            className="flex flex-col p-5 gap-4 bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 relative"
          >
            <button
              type="button"
              className="absolute top-3 right-3 w-10 h-10 z-50"
              onClick={() => setPopupEditActive(false)}
            >
              <span className="relative w-full h-full">
                <span className="absolute w-7 h-0.5 bg-black rotate-45"></span>
                <span className="absolute w-7 h-0.5 bg-black -rotate-45"></span>
              </span>
            </button>
            <h1 className="text-2xl font-bold text-center">Prestasi</h1>
            <label>Prestasi</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <label>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <label
              htmlFor="gambar"
              className="cursor-pointer px-3 py-2 w-56 text-center bg-blue-600 text-white font-bold rounded-md"
            >
              Edit gambar
            </label>
            <input
              type="file"
              id="gambar"
              className="hidden"
              onChange={handleFileChange}
            />
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                width={2000}
                height={2000}
                className="w-full max-h-72 object-cover object-center"
              />
            ) : (
              <div className="w-full max-h-72 bg-gray-200" />
            )}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loadingEdit}
                className={`px-4 py-2 font-bold rounded-md text-white ${
                  loadingEdit
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600"
                }`}
              >
                {loadingEdit ? "Updating..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPopupEditActive(false);
                  resetForm();
                  setEditPrestasi(null);
                  setEditId(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white font-bold rounded-md"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}
      <h1 className="text-4xl font-bold text-hijau">Prestasi</h1>
      <button
        onClick={() => setPopupAddActive(true)}
        className="w-[120px] h-10 bg-blue-600 text-white rounded-md"
      >
        Tambah
      </button>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-5">
        {currentData.map((item) => (
          <div
            key={item.id}
            className="shadow-md rounded-md overflow-hidden"
          >
            <div className="w-full h-56 relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/prestasi/${item.gambar}`}
                alt={item.judul}
                width={800}
                height={800}
                priority
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h2 className="font-bold text-xl">{item.judul}</h2>
              <p className="text-sm">{item.deskripsi}</p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => {
                    setEditId(item.id);
                    setPopupEditActive(true);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  disabled={loadingDelete === item.id}
                  onClick={() => handleDelete(item.id)}
                  className={`px-3 py-1 rounded-md text-white ${
                    loadingDelete === item.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600"
                  }`}
                >
                  {loadingDelete === item.id ? "Deleting..." : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
