"use client"
import Image from "next/image";
import Account from "@/public/account.png";
import { useEffect, useState } from "react";
import { Admin } from "@/app/types/types";
import { AdminGet } from "@/app/api/admin";
import { KesiswaanDelete } from "@/app/api/kesiswaan";
import { useSession } from "next-auth/react";

export default function AdminAdmin() {
    // const [preview, setPreview] = useState<string>("");
    // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const url = URL.createObjectURL(file);
    //         setPreview(url);
    //     }
    // };
  const { data: session } = useSession();
  const [data, setData] = useState<Admin[]>([]);
  useEffect(() => {
    if (!session?.user.accessToken) return;
    AdminGet(session.user.accessToken)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [session]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function DeleteAdmin (id:string) {
        KesiswaanDelete({id})
        .then(() => {
            window.location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const [pupUpActiv, setPupUpActiv] = useState(false);
    const [pupUpEditActiv, setPupUpEditActiv] = useState(false);
    function PopUp() {
        return (
            <div className="w-full h-full z-10">
                <div className="w-full h-full fixed bg-slate-300 opacity-40 left-0 top-0">
                </div>
                <div className="flex flex-col p-3 gap-3 z-10 fixed bg-slate-50 w-auto h-auto left-0 right-0 top-0 bottom-0 md:left-[10%] rounded-lg md:bottom-[22%] md:right-[10%] md:top-[22%]">
                    <button
                        className="w-10 h-10 md:top-2 md:right-2 top-3 right-3 absolute z-50"
                        onClick={() => setPupUpActiv(false)}
                    >
                        <span className="w-full h-full">
                            <span className="w-7 h-0.5 rounded-full -right-3 absolute rotate-45 bg-black"></span>
                            <span className="w-7 h-0.5 rounded-full -right-3 absolute -rotate-45 bg-black"></span>
                        </span>
                    </button>
                    <label htmlFor="nama" className="mt-4">nama</label>
                    <input type="text" id="nama" name="nama" className="w-full bg-slate-300  border-none outline-none rounded-md p-2" />
                    <label htmlFor="password" className="mt-4">password</label>
                    <input type="text" id="password" name="password" className="w-full h-10 bg-slate-300  border-none outline-none rounded-md p-2" />
                    <button className="text-white mt-10 cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">Submit</button>
                </div>
            </div>
        )
    }
    function PopUpEdit() {
        return (
            <>
                <div className="w-full h-full fixed bg-slate-300 opacity-40 left-0 top-0">
                </div>
                <div className="flex flex-col p-3 gap-3 z-20 fixed bg-slate-50 w-auto h-auto left-0 right-0 top-0 bottom-0 md:left-[10%] rounded-lg md:bottom-[22%] md:right-[10%] md:top-[22%]">
                    <button
                        className="w-10 h-10 top-3 right-3 absolute z-50"
                        onClick={() => setPupUpEditActiv(false)}
                    >
                        <span className="w-full h-full">
                            <span className="w-7 h-0.5 rounded-full -right-3 absolute rotate-45 bg-black"></span>
                            <span className="w-7 h-0.5 rounded-full -right-3 absolute -rotate-45 bg-black"></span>
                        </span>
                    </button>
                    <label htmlFor="nama" className="mt-4">nama</label>
                    <input type="text" id="nama" name="nama" className="w-full bg-slate-300  border-none outline-none rounded-md p-2" />
                    <label htmlFor="password" className="mt-4">password</label>
                    <input type="text" id="password" name="password" className="w-full h-10 bg-slate-300  border-none outline-none rounded-md p-2" />
                    <span className="flex gap-4">
                    <button className="text-white mt-10 cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">Edit</button>
                    <button className="text-white mt-10 cursor-pointer w-48 rounded-xl px-3 py-2 text-xl font-bold bg-blue-600 text-center">Delete</button>
                    </span>
                </div>
            </>
        )
    }
    return (
        <>
            {pupUpActiv ? <PopUp></PopUp> : <></>}
            {pupUpEditActiv ? <PopUpEdit></PopUpEdit> : <></>}
            <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10 ">
                <h1 className="text-hijau text-4xl font-bold">Admin</h1>
                <button onClick={() => setPupUpActiv(!pupUpActiv)} className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Tambah</button>
                <div className="w-full min-h-10 flex flex-wrap gap-y-5 items-center gap-2 xl:gap-3 justify-center">
                    {data.map((item, loop) => (
                        <button onClick={() => setPupUpEditActiv(true)} key={loop} className="overflow-hidden pr-2 text-ellipsis flex min-w-40 w-[48%] lg:w-[322%] xl:w-[24%] h-14 rounded-lg items-center text-lg bg-sky-100">
                            <Image className="h-14 w-14 object-cover object-center" src={Account} width={800} height={800} alt=""></Image>
                            <p className="max-w-1/2 overflow-hidden text-ellipsis">{item.username}</p>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}