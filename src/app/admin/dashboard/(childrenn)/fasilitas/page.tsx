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

export default function DashboardAboutPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [nama, setNama] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fasilitas, setFasilitas] = useState<DataAbout[]>([]);
  const [fasilitasEdit, setFasilitasEdit] = useState<DataAbout | null>(null);
  const [idEdit, setIdEdit] = useState<number>(0);
  const [popupActive, setPopupActive] = useState(false);
  const [popupEditActive, setPopupEditActive] = useState(false);

  // Fetch data
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
      setPreview(`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/${fasilitasEdit.gambar}`);
    }
  }, [popupEditActive, fasilitasEdit]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget.elements.namedItem("nama") as HTMLInputElement).value;
    if (!file) return alert("Please select a file!");
    const response = await AboutFasilitasAdd({ name, picture: file });
    if (response.status) {
      alert("Upload berhasil!");
      setFile(null);
      setPreview(null);
      setNama("");
      setPopupActive(false);
      AboutFasilitasGet().then((res) => setFasilitas(res.data));
    } else {
      alert("Upload gagal!");
    }
  };
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fasilitasEdit) return;
    const judul = (e.currentTarget.elements.namedItem("nama") as HTMLInputElement).value;
    const gambar = file ? file : null;
    const response = await AboutFasilitasEdit({
      id: fasilitasEdit.id,
      judul,
      gambar,
    });
    if (response.status) {
      alert("Edit berhasil!");
      setFile(null);
      setPreview(null);
      setNama("");
      setPopupEditActive(false);
      AboutFasilitasGet().then((res) => setFasilitas(res.data));
    } else {
      alert("Edit gagal!");
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await AboutFasilitasDelete( id )
        .then(() => {
          window.location.reload()
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {popupActive && (
        <div className={`fixed inset-0 bg-slate-300 ${popupActive ? "block" : "hidden"}`}>
          <form
            onSubmit={handleAddSubmit}
            className={`flex flex-col p-3 gap-3  ${popupActive ? "block" : "hidden"} fixed bg-slate-50 w-auto h-auto left-[10%] right-[10%] top-[5%] bottom-[5%] rounded-lg z-20`}
          >
            <button
              type="button"
              className="absolute top-3 right-3 w-10 h-10 z-50"
              onClick={() => setPopupActive(false)}
            >
              <span className="relative w-full h-full">
                <span className="absolute w-7 h-0.5 bg-black rotate-45"></span>
                <span className="absolute w-7 h-0.5 bg-black -rotate-45"></span>
              </span>
            </button>
            <label htmlFor="nama" className="mt-4">Nama</label>
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
              <div className="w-full min-h-96 max-h-[500px] bg-gray-200 object-cover object-center" />
            )}
            <button
              type="submit"
              className="text-white cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {popupEditActive ? (
        fasilitasEdit ? (
          <div className="fixed inset-0 bg-slate-300 z-10">
            <form onSubmit={handleEditSubmit} className="flex flex-col p-3 gap-3 fixed bg-slate-50 w-auto h-auto left-[10%] right-[10%] top-[5%] bottom-[5%] rounded-lg z-20">
              <button
                type="button"
                className="absolute top-3 right-3 w-10 h-10 z-50"
                onClick={() => setPopupEditActive(false)}
              >
                X
              </button>
              <label htmlFor="nama" className="mt-4">Nama</label>
              <input
                type="text"
                id="nama"
                name="nama"
                defaultValue={fasilitasEdit.judul}
                className="w-full bg-slate-300 border-none outline-none rounded-md p-2"
              />
              <label htmlFor="gambar" className="text-white cursor-pointer w-56 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">
                Edit Gambar
              </label>
              <input type="file" id="gambar" name="gambar" onChange={handleFileChange} className="hidden" />
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
                className="text-white cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          console.log("gagal")
        )
      ) : null}

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
        <div className="w-full flex flex-col justify-between gap-10">
          <div className="w-full flex flex-wrap justify-around items-center gap-y-7">
            {fasilitas.map((item) => (
              <div key={item.id} className="group w-full lg:w-[45%] flex flex-col mx-auto items-start">
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
                  <h1 className="text-2xl text-hijau font-bold group-hover:translate-x-4 group-hover:scale-105 duration-300">
                    {item.judul}
                  </h1>
                  <span className="flex justify-center gap-5">
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
                      className="py-2 px-4 bg-red-600 rounded-md w-20 text-white font-bold"
                    >
                      Hapus
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
