"use client";

import { useState, useEffect } from "react";
import { VisimisiGet, VisimisiEdit, VisimisiAdd } from "@/app/api/visimisi";
import { VisiMisi } from "@/app/types/types";

export default function VisimisiAdmin() {
  const [data, setData] = useState<VisiMisi | null>(null);
  const [newData, setNewData] = useState<{ visi: string; misi: string; moto: string }>({
    visi: "",
    misi: "",
    moto: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    VisimisiGet()
      .then((res) => {
        setData(res.data?.[0] ?? null);
        if (!res.data?.[0]) {
          setNewData({ visi: "", misi: "", moto: "" });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = async (field: "visi" | "misi" | "moto", value: string) => {
    if (!data || isSubmitting) return;
    setIsSubmitting(true);
    const payload = {
      id: data.id,
      visi: field === "visi" ? value : data.visi,
      misi: field === "misi" ? value : data.misi,
      moto: field === "moto" ? value : data.moto,
    };
    try {
      const res = await VisimisiEdit(payload);
      if (!res.status) throw new Error("Gagal update visi misi");
      setData(res.data);
      alert("Berhasil update");
      window.location.reload();
    } catch {
      alert("Gagal update");
      window.location.reload();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateNew = async () => {
    if (!newData.visi || !newData.misi || !newData.moto || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await VisimisiAdd({ ...newData });
      if (res.status) {
        alert("Berhasil menambahkan visi misi");
        setData(res.data);
        setNewData({ visi: "", misi: "", moto: "" });
        window.location.reload();
      } else {
        alert("Gagal menambahkan visi misi");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center flex-col text-black px-4">
      <h1 className="text-hijau text-4xl font-bold my-5 text-center">Visi Misi</h1>
      {data ? (
        <div className="gap-10 justify-center flex flex-col md:flex-row flex-wrap items-center">
          <div className="flex flex-col items-center md:w-[50vh] w-full h-[42vh] rounded-md shadow-md group">
            <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]">Visi</label>
            <textarea
              defaultValue={data.visi}
              onBlur={(e) => handleEdit("visi", e.target.value)}
              disabled={isSubmitting}
              placeholder="Tulis visi di sini..."
              className="p-2 rounded-md shadow-md mt-5 w-[90%] h-[25vh] resize-none border-2 focus:border-[#00978F] focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-center md:w-[50vh] w-full h-[42vh] rounded-md shadow-md group">
            <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]">Misi</label>
            <textarea
              defaultValue={data.misi}
              onBlur={(e) => handleEdit("misi", e.target.value)}
              disabled={isSubmitting}
              placeholder="Tulis misi di sini..."
              className="p-2 rounded-md shadow-md mt-5 w-[90%] h-[25vh] resize-none border-2 focus:border-[#00978F] focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-center md:w-[50vh] w-full h-[42vh] rounded-md shadow-md group">
            <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]">Moto</label>
            <textarea
              defaultValue={data.moto}
              onBlur={(e) => handleEdit("moto", e.target.value)}
              disabled={isSubmitting}
              placeholder="Tulis moto di sini..."
              className="p-2 rounded-md shadow-md mt-5 w-[90%] h-[25vh] resize-none border-2 focus:border-[#00978F] focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <div className="gap-10 justify-center flex flex-col md:flex-row flex-wrap items-center">
          <div className="flex flex-col items-center md:w-[50vh] w-full h-[42vh] rounded-md shadow-md group">
            <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]">Visi</label>
            <textarea
              value={newData.visi}
              onChange={(e) => setNewData((prev) => ({ ...prev, visi: e.target.value }))}
              disabled={isSubmitting}
              placeholder="Tulis visi di sini..."
              className="p-2 rounded-md shadow-md mt-5 w-[90%] h-[25vh] resize-none border-2 focus:border-[#00978F] focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-center md:w-[50vh] w-full h-[42vh] rounded-md shadow-md group">
            <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]">Misi</label>
            <textarea
              value={newData.misi}
              onChange={(e) => setNewData((prev) => ({ ...prev, misi: e.target.value }))}
              disabled={isSubmitting}
              placeholder="Tulis misi di sini..."
              className="p-2 rounded-md shadow-md mt-5 w-[90%] h-[25vh] resize-none border-2 focus:border-[#00978F] focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-center md:w-[50vh] w-full h-[42vh] rounded-md shadow-md group">
            <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]">Moto</label>
            <textarea
              value={newData.moto}
              onChange={(e) => setNewData((prev) => ({ ...prev, moto: e.target.value }))}
              disabled={isSubmitting}
              placeholder="Tulis moto di sini..."
              className="p-2 rounded-md shadow-md mt-5 w-[90%] h-[25vh] resize-none border-2 focus:border-[#00978F] focus:outline-none"
            />
          </div>
          <div className="flex justify-center w-full mt-4">
            <button
              onClick={handleCreateNew}
              disabled={isSubmitting}
              className={`px-8 py-2 rounded-md text-lg text-white ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Visi Misi"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
