import Link from "next/link";
import Image from "next/image";
import Account from "@/public/account.png";

export default function AdminAdmin() {
    return (
        <>
            <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10 ">
                <h1 className="text-hijau text-4xl font-bold">Admin</h1>
                <Link href={"/admin/dashboard/about/add"} className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Tambah</Link>
                <div className="w-full min-h-10 flex flex-wrap gap-y-5 items-center gap-2 xl:gap-3 justify-center">
                    {[4,4,53,3, 1, 3].map((item, loop) => (
                        <Link key={loop + 1} href={`/admin/dashboard/admin/${item}`} className="overflow-hidden pr-2 text-ellipsis flex min-w-40 w-[48%] lg:w-[32%] xl:w-[24%] h-14 rounded-lg items-center text-lg bg-sky-100">
                            <Image className="h-14 w-14 object-cover object-center" src={Account} width={800} height={800} alt=""></Image>
                            <p className="max-w-1/2 overflow-hidden text-ellipsis">Admin12dsadasdasd3</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}