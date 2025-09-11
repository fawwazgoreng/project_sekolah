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
    console.log(prestasi);
    // Fetch all prestasi
    const fetchPrestasi = () => {
        PrestasiGet()
            .then((res) => setPrestasi(res.data))
            .catch(console.error);
    };

    useEffect(() => fetchPrestasi(), []);

    // Fetch prestasi by ID for editing
    useEffect(() => {
        if (editId !== null) {
            PrestasiGetId(editId)
                .then((res) => {
                    setEditPrestasi(res.data);
                    setNama(res.data.judul);
                    setDesc(res.data.deskripsi);
                    setPreview(`${process.env.NEXT_PUBLIC_BASEPICTURE}/storage/prestasi/${res.data.gambar}`);
                })
                .catch(console.error);
        }
    }, [editId]);

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
        const res = await PrestasiAdd({ title: nama, desc, picture: file });
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
        if (!editPrestasi) return;
        const res = await PrestasiEdit({
            id: editId,
            title: nama,
            desc,
            picture: file ? file : undefined,
        });
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
        await PrestasiDelete(id);
        fetchPrestasi();
    };


    return (
        <div className="w-11/12 mx-auto mt-10 flex flex-col gap-8">
            {popupAddActive && (
                <div className={`fixed inset-0 ${popupAddActive ? "flex" : "hidden"} bg-slate-300 z-10 justify-center items-center`}>
                    <form
                        onSubmit={handleAddSubmit}
                        className="flex flex-col p-5 gap-4 bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 relative"
                    >
                        <label>Nama</label>
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
                        <input type="file" id="gambar" className="hidden" onChange={handleFileChange} />
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
                            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
            {popupEditActive && (
                <div className={`fixed inset-0 ${popupEditActive ? "flex" : "hidden"} bg-slate-300 z-10 justify-center items-center`}>
                    <form
                        onSubmit={handleEditSubmit}
                        className="flex flex-col p-5 gap-4 bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 relative"
                    >
                        <label>Nama</label>
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
                        <input type="file" id="gambar" className="hidden" onChange={handleFileChange} />
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
                                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md"
                            >
                                Submit
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
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-5">
                {prestasi.map((item) => (
                    <div key={item.id} className="shadow-md rounded-md overflow-hidden">
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
                                    onClick={() => handleDelete(item.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded-md"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
