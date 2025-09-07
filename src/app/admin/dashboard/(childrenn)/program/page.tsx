"use client"
import { 
  AboutExtraAdd, AboutExtraDelete, AboutExtraEdit, AboutExtraGet, 
  AboutProgramAdd, AboutprogramDelete, AboutProgramEdit, AboutprogramGet 
} from "@/app/api/about";
import { DataAbout } from "@/app/types/types";
import { useEffect, useState } from "react";

export default function ProgramAdmin() {
  const [extra, setExtra] = useState<DataAbout[]>([]);
  const [newExtra, setNewExtra] = useState("");
  const [program, setProgram] = useState<DataAbout[]>([]);
  const [newProgram, setNewProgram] = useState("");

  useEffect(() => {
    AboutExtraGet().then((res) => setExtra(res.data)).catch((err) => console.log(err));
    AboutprogramGet().then((res) => setProgram(res.data)).catch((err) => console.log(err));
  }, []);

  async function EditExtra(id: number, judul: string) {
    const result = await AboutExtraEdit( id, judul );
    if (result) {
      console.log("Berhasil update:", result);
    } else {
      console.log("Gagal update");
    }
  }

  async function DeleteExtra(id: number) {
    try {
      await AboutExtraDelete( id );
      setExtra((prev) => prev.filter((x) => x.id !== id)); // update tanpa reload
    } catch (err) {
      console.error(err);
    }
  }

  async function HandleAddExtra(e: React.FormEvent) {
    e.preventDefault();
    if (!newExtra.trim()) return;
    const res = await AboutExtraAdd(newExtra);
    if (res.status) {
      setExtra((prev) => [...prev, res.data]); 
      setNewExtra(""); // reset input
      window.location.reload();
    } else {
      console.log("Gagal tambah:", res.message);
    }
  }

  
  async function EditProgram(id: number, judul: string) {
    const result = await AboutProgramEdit( id, judul );
    if (result) {
      console.log("Berhasil update:", result);
    } else {
      console.log("Gagal update");
    }
  }

  async function HandleAddProgram(e: React.FormEvent) {
    e.preventDefault();
    if (!newProgram.trim()) return;
    const res = await AboutProgramAdd(newProgram );
    if (res.status) {
      setProgram((prev) => [...prev, res.data]);
      setNewProgram("");
      window.location.reload();
    } else {
      console.log("Gagal tambah program:", res.message);
    }
  }

  async function DeleteProgram(id: number) {
    try {
      await AboutprogramDelete( id );
      setProgram((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10">
      <h1 className="text-hijau text-4xl font-bold">Program sekolah dan Extrakulikuler</h1>
      <span className="w-full flex flex-row flex-wrap justify-around items-center gap-y-7">
        
        {/* Extrakurikuler */}
        <div className="inline-block xl:w-[43%] w-full mx-auto min-h-40 py-4 bg-second rounded-md">
          <span className="w-11/12 flex flex-col mx-auto gap-4 mt-4">
            <h1 className="font-bold text-2xl">Extrakulikuler</h1>
            <form onSubmit={HandleAddExtra} className="flex">
              <input 
                value={newExtra}
                onChange={(e) => setNewExtra(e.target.value)}
                type="text" 
                className="border-none outline-none w-2/3 min-h-8 px-2 rounded-md" 
                placeholder="tambah ekstrakurikuler" 
              />
              <button type="submit" className="px-4 py-3 ml-5 h-10 bg-blue-600 text-white rounded">
                Tambah
              </button>
            </form>
            <table border={1} className="w-full">
              <thead>
                <tr>
                  <th>no</th>
                  <th className="text-start lg:pl-6 pl-2">nama Extrakurikuler</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {extra.map((item, loop) => (
                  <tr key={item.id}>
                    <td className="text-center">{loop + 1}</td>
                    <td className="lg:pl-6">
                      <input
                        className="w-full bg-transparent px-2"
                        type="text"
                        defaultValue={item.judul}
                        onBlur={(e) => EditExtra(item.id, e.target.value)}
                      />
                    </td>
                    <td className="flex gap-2 justify-center">
                      <button 
                        className="bg-red-600 text-white w-16 text-center px-2 py-1 rounded-lg" 
                        onClick={() => DeleteExtra(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </span>
        </div>
        <div className="inline-block xl:w-[43%] w-full mx-auto min-h-40 py-4 bg-second rounded-md">
          <span className="w-11/12 flex flex-col mx-auto gap-4 mt-4">
            <h1 className="font-bold text-2xl">Program</h1>
            <form onSubmit={HandleAddProgram} className="flex">
              <input 
                value={newProgram}
                onChange={(e) => setNewProgram(e.target.value)}
                type="text" 
                className="border-none outline-none w-2/3 min-h-8 px-2 rounded-md" 
                placeholder="tambah program" 
              />
              <button type="submit" className="px-4 py-3 ml-5 h-10 bg-blue-600 text-white rounded">
                Tambah
              </button>
            </form>
            <table border={1} className="w-full">
              <thead>
                <tr>
                  <th>no</th>
                  <th className="text-start lg:pl-6 pl-2">nama program</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {program.map((item, loop) => (
                  <tr key={item.id}>
                    <td className="text-center">{loop + 1}</td>
                    <td className="lg:pl-6">
                      <input
                        className="w-full bg-transparent px-2"
                        type="text"
                        defaultValue={item.judul}
                        onBlur={(e) => EditProgram(item.id , e.target.value)}
                      />
                    </td>
                    <td className="flex gap-2 justify-center">
                      <button 
                        className="bg-red-600 text-white w-16 text-center px-2 py-1 rounded-lg" 
                        onClick={() => DeleteProgram(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </span>
        </div>

      </span>
    </div>
  );
}
