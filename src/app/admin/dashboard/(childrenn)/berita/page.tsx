import Image from "next/image";
import Wkk from "@/public/wkk.jpeg";
import Link from "next/link";

export default function BeritaAdmin() {
    return (
        <>
            <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10 ">
                <h1 className="text-hijau text-4xl font-bold">Berita</h1>
                <Link href={"/admin/dashboard/berita/add"} className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Tambah</Link>
                <div className="mt-5 w-full flex flex-wrap justify-between gap-y-6">
                    <div className="w-full lg:w-[48%] xl:w-[32%]  min-h-96 shadow-lg rounded-md overflow-hidden">
                        <span className="w-full h-48 overflow-hidden inline-block">
                            <Image src={Wkk} alt="" width={800} height={800} className=" w-full h-full object-center object-cover"></Image>
                        </span>
                        <h1 className=" w-11/12 flex mx-auto text-xl font-bold mt-2">Lorem ipsum dolor sit amet.</h1>
                        <p className="w-11/12 flex mx-auto text-wrap overflow-hidden mt-2 text-ellipsis">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Officia et dolore cupiditate Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, nostrum. assumenda explicabo minima obcaecati odit quas quibusdam recusandae.</p>
                        <span className="w-11/12 flex mx-auto justify-between items-center">
                        <p className="text-second text-md">20/20/2020</p>
                        <span className="flex gap-4">
                        <Link className="my-2 py-2 px-4 w-20 text-center bg-blue-600 text-white font-bold rounded-md" href={"/admin/dashboard/berita/1"}>Edit</Link>
                        <Link className="my-2 py-2 px-4 w-20 text-center bg-red-600 text-white font-bold rounded-md" href={""}>Hapus</Link>
                        </span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}