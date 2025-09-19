'use client';

import {
  AboutExtraAdd, AboutExtraDelete, AboutExtraEdit, AboutExtraGet,
  AboutProgramAdd, AboutprogramDelete, AboutProgramEdit, AboutprogramGet
} from "@/app/api/about";
import { useEffect, useState } from "react";
import { DataAbout } from "@/app/types/types";

export default function ProgramAdmin() {
  const [extra, setExtra] = useState<DataAbout[]>([]);
  const [newExtra, setNewExtra] = useState("");
  const [program, setProgram] = useState<DataAbout[]>([]);
  const [newProgram, setNewProgram] = useState("");

  const [loadingExtra, setLoadingExtra] = useState(false);
  const [loadingProgram, setLoadingProgram] = useState(false);
  const [deletingIdExtra, setDeletingIdExtra] = useState<number | null>(null);
  const [deletingIdProgram, setDeletingIdProgram] = useState<number | null>(null);

  useEffect(() => {
    AboutExtraGet().then((res) => setExtra(res.data)).catch(console.error);
    AboutprogramGet().then((res) => setProgram(res.data)).catch(console.error);
  }, []);

  async function EditExtra(id: number, judul: string) {
    try {
      const result = await AboutExtraEdit(id, judul);
      if (result) {
        alert("Berhasil update Extrakurikuler");
      } else {
        alert("Gagal update Extrakurikuler");
      }
    } catch {
      alert("Error update Extrakurikuler");
    }
  }

  async function DeleteExtra(id: number) {
    if (!confirm("Apakah yakin ingin menghapus?")) return;
    setDeletingIdExtra(id);
    try {
      await AboutExtraDelete(id);
      setExtra((prev) => prev.filter((x) => x.id !== id));
      alert("Berhasil menghapus Extrakurikuler");
    } catch {
      alert("Gagal menghapus Extrakurikuler");
    } finally {
      setDeletingIdExtra(null);
    }
  }

  async function HandleAddExtra(e: React.FormEvent) {
    e.preventDefault();
    if (!newExtra.trim()) return;

    setLoadingExtra(true);
    try {
      const res = await AboutExtraAdd(newExtra);
      if (res.status) {
        alert("Berhasil menambah Extrakurikuler");
        window.location.reload();
      } else {
        alert("Gagal menambah Extrakurikuler");
      }
    } catch {
      alert("Error server saat menambah Extrakurikuler");
    } finally {
      setLoadingExtra(false);
    }
  }

  async function EditProgram(id: number, judul: string) {
    try {
      const result = await AboutProgramEdit(id, judul);
      if (result) {
        alert("Berhasil update Program");
      } else {
        alert("Gagal update Program");
      }
    } catch {
      alert("Error update Program");
    }
  }

  async function HandleAddProgram(e: React.FormEvent) {
    e.preventDefault();
    if (!newProgram.trim()) return;
    setLoadingProgram(true);
    try {
      const res = await AboutProgramAdd(newProgram);
      if (res.status) {
        alert("Berhasil menambah Program");
        window.location.reload();
      } else {
        alert("Gagal menambah Program");
        window.location.reload();
      }
    } catch {
      alert("Error server saat menambah Program");
    } finally {
      setLoadingProgram(false);
    }
  }

  async function DeleteProgram(id: number) {
    if (!confirm("Apakah yakin ingin menghapus?")) return;
    setDeletingIdProgram(id);
    try {
      await AboutprogramDelete(id);
      setProgram((prev) => prev.filter((x) => x.id !== id));
      alert("Berhasil menghapus Program");
    } catch {
      alert("Gagal menghapus Program");
    } finally {
      setDeletingIdProgram(null);
    }
  }

  return (
    <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10">
      <h1 className="text-hijau text-4xl font-bold">
        Program Sekolah dan Extrakurikuler
      </h1>
      <div className="w-full flex flex-wrap justify-between items-start gap-7">
        <div className="w-full xl:w-[48%] bg-second rounded-md p-5 shadow-md">
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-2xl">Extrakurikuler</h2>
            <form onSubmit={HandleAddExtra} className="flex flex-wrap gap-3">
              <input
                value={newExtra}
                onChange={(e) => setNewExtra(e.target.value)}
                type="text"
                className="flex-grow border border-gray-300 outline-none px-3 py-2 rounded-md"
                placeholder="Tambah ekstrakurikuler"
              />
              <button
                type="submit"
                disabled={loadingExtra}
                className={`px-4 py-2 rounded text-white font-bold ${
                  loadingExtra
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loadingExtra ? "Proses..." : "Tambah"}
              </button>
            </form>

            <table className="w-full table-auto border border-gray-300 rounded overflow-hidden text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3">No</th>
                  <th className="text-left px-3">Nama Ekstra</th>
                  <th className="text-center px-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {extra.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-300">
                    <td className="text-center py-2">{index + 1}</td>
                    <td className="px-3">
                      <input
                        className="w-full bg-transparent px-2 py-1 rounded"
                        type="text"
                        defaultValue={item.judul}
                        onBlur={(e) => {
                          const newValue = e.target.value.trim();
                          if (newValue !== item.judul) {
                            EditExtra(item.id, newValue);
                          }
                        }}
                      />
                    </td>
                    <td className="text-center">
                      <button
                        disabled={deletingIdExtra === item.id}
                        className={`px-3 py-1 rounded text-white my-1 ${
                          deletingIdExtra === item.id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                        onClick={() => DeleteExtra(item.id)}
                      >
                        {deletingIdExtra === item.id ? "Hapus..." : "Hapus"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full xl:w-[48%] bg-second rounded-md p-5 shadow-md">
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-2xl">Program</h2>
            <form onSubmit={HandleAddProgram} className="flex flex-wrap gap-3">
              <input
                value={newProgram}
                onChange={(e) => setNewProgram(e.target.value)}
                type="text"
                className="flex-grow border border-gray-300 outline-none px-3 py-2 rounded-md"
                placeholder="Tambah program"
              />
              <button
                type="submit"
                disabled={loadingProgram}
                className={`px-4 py-2 rounded text-white font-bold ${
                  loadingProgram
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loadingProgram ? "Proses..." : "Tambah"}
              </button>
            </form>

            <table className="w-full table-auto border border-gray-300 rounded overflow-hidden text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3">No</th>
                  <th className="text-left px-3">Nama Program</th>
                  <th className="text-center px-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {program.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-300">
                    <td className="text-center py-2">{index + 1}</td>
                    <td className="px-3">
                      <input
                        className="w-full bg-transparent px-2 py-1 rounded"
                        type="text"
                        defaultValue={item.judul}
                        onBlur={(e) => {
                          const newValue = e.target.value.trim();
                          if (newValue !== item.judul) {
                            EditProgram(item.id, newValue);
                          }
                        }}
                      />
                    </td>
                    <td className="text-center">
                      <button
                        disabled={deletingIdProgram === item.id}
                        className={`px-3 py-1 rounded text-white my-1 ${
                          deletingIdProgram === item.id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                        onClick={() => DeleteProgram(item.id)}
                      >
                        {deletingIdProgram === item.id ? "Hapus..." : "Hapus"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
