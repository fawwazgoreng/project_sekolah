"use client"
import { useState, useEffect } from "react";
import { VisimisiGet, VisimisiEdit } from "@/app/api/visimisi";
import { VisiMisi } from "@/app/types/types";

export default function VisimisiAdmin() {
  const [edits, setEdits] = useState<Partial<VisiMisi>>({});
  const [data, setData] = useState<VisiMisi | null>(null);

  useEffect(() => {
    VisimisiGet()
      .then((res) => setData(res.data[0]))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (field: "visi" | "misi" | "moto", value: string) => {
    setEdits((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = async () => {
    if (!data) return;

    const payload = {
      id: data.id,
      visi: edits.visi ?? data.visi,
      misi: edits.misi ?? data.misi,
      moto: edits.moto ?? data.moto,
    };

    try {
      const res = await VisimisiEdit(payload);
      if (!res.status) throw new Error("Failed to update Visi Misi");
      setData(res.data);
      setEdits({});
    } catch (err) {
      console.error(err);
    }
  };

  const getFieldValue = (field: "visi" | "misi" | "moto") => edits?.[field] ?? data?.[field] ;
  
  return (
    <div className="w-full h-full flex justify-center flex-col text-black">
      <h1 className="text-hijau text-4xl font-bold my-5">Visi Misi</h1>
      <form className="gap-10 justify-center flex flex-col md:flex-row flex-wrap items-center text full h-full mt-2">
        <div className="flex flex-col items-center md:w-[50vh] md:h-[48vh] w-[40vh] h-[42vh] rounded-md shadow-md inset-shadow-xs group">
          <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]">Visi</label>
          <textarea
            value={getFieldValue("visi")}
            onChange={(e) => handleInputChange("visi", e.target.value)}
            onBlur={handleEdit}
            placeholder="Ketik disini"
            className="p-2 rounded-md shadow-md inset-shadow-xs mt-5 w-[90%] md:h-[30vh] h-[25vh] resize-none border-2 focus:border-[#00978F] focus:outline-none"
          />
        </div>

        <div className="flex flex-col items-center md:w-[50vh] md:h-[48vh] w-[40vh] h-[42vh] rounded-md shadow-md inset-shadow-xs group">
          <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]">Misi</label>
          <textarea
            value={getFieldValue("misi")}
            onChange={(e) => handleInputChange("misi", e.target.value)}
            onBlur={handleEdit}
            placeholder="Ketik disini"
            className="p-2 rounded-md shadow-md inset-shadow-xs mt-5 w-[90%] md:h-[30vh] h-[25vh] resize-none border-2 focus:border-[#00978F] focus:outline-none"
          />
        </div>

        <div className="flex flex-col items-center md:w-[50vh] md:h-[48vh] w-[40vh] h-[42vh] rounded-md shadow-md inset-shadow-xs group">
          <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]">Moto</label>
          <textarea
            value={getFieldValue("moto")}
            onChange={(e) => handleInputChange("moto", e.target.value)}
            onBlur={handleEdit}
            placeholder="Ketik disini"
            className="p-2 rounded-md shadow-md inset-shadow-xs mt-5 w-[90%] md:h-[30vh] h-[25vh] resize-none border-2 focus:border-[#00978F] focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
}
