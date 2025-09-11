"use client";

import Image from "next/image";
import { useEffect, useState, ChangeEvent } from "react";
import { SejarahGet, SejarahEdit } from "@/app/api/sejarah";
import { DataAbout } from "@/app/types/types";

export default function SejarahAdmin() {
    const [data, setData] = useState<DataAbout[]>([]);
    const [previewImages, setPreviewImages] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        SejarahGet()
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Track local edits per item
    const [edits, setEdits] = useState<{ [key: number]: { judul?: string; deskripsi?: string } }>({});

    const handleEdit = async (id: number, newJudul?: string, newDeskripsi?: string, newFile?: File) => {
        const item = data.find((d) => d.id === id);
        if (!item) return;

        // Use local edits if available
        const judul = newJudul ?? edits[id]?.judul ?? item.judul;
        const deskripsi = newDeskripsi ?? edits[id]?.deskripsi ?? item.deskripsi;

        try {
            const res = await SejarahEdit({ id, judul, deskripsi, gambar: newFile });
            if (!res.status) throw new Error("Failed to update sejarah");

            setData((prev) =>
                prev.map((d) =>
                    d.id === id
                        ? { ...d, judul, deskripsi, gambar: res.data.gambar || d.gambar }
                        : d
                )
            );

            // Clear edits for this item
            setEdits((prev) => {
                const newPrev = { ...prev };
                delete newPrev[id];
                return newPrev;
            });

            // Clean up preview image if file was uploaded
            if (newFile) {
                setPreviewImages((prev) => {
                    const newPrev = { ...prev };
                    delete newPrev[id];
                    return newPrev;
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = async (id: number, e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];

        // Create preview
        const previewUrl = URL.createObjectURL(file);
        setPreviewImages((prev) => ({ ...prev, [id]: previewUrl }));

        // Automatically upload the file
        const item = data.find((d) => d.id === id);
        if (!item) return;

        try {
            const res = await SejarahEdit({ id, judul: item.judul, deskripsi: item.deskripsi, gambar: file });
            if (res.status) {
                setData((prev) =>
                    prev.map((d) => (d.id === id ? { ...d, gambar: res.data.gambar || d.gambar } : d))
                );

                // Cleanup preview
                URL.revokeObjectURL(previewUrl);
                setPreviewImages((prev) => {
                    const newPrev = { ...prev };
                    delete newPrev[id];
                    return newPrev;
                });
            } else {
                console.error("Upload failed:", res.message);
            }
        } catch (err) {
            console.error(err);
        }
    };



    return (
        <div className="w-full h-full flex flex-col justify-center p-4">
            <h1 className="text-hijau text-4xl font-bold mb-6">Sejarah</h1>
            {data.map((res) => (
                <div key={res.id} className="mb-8">
                    <input
                        type="text"
                        defaultValue={res.judul}
                        onBlur={(e) => handleEdit(res.id, e.target.value, res.deskripsi)}
                        className="p-2 my-3 text-2xl text-hijau font-bold w-full border border-gray-300 rounded"
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
                                onChange={(e) => handleFileChange(res.id, e)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <textarea
                            defaultValue={res.deskripsi}
                            onBlur={(e) => handleEdit(res.id, res.judul, e.target.value)}
                            placeholder="Sejarah sekolah..."
                            className="p-2 w-full h-full text-[15px] md:text-[20px] text-black font-light shadow-inner rounded resize-none border border-gray-300"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
