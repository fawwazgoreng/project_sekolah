"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Wkk from "@/public/wkk.jpeg";
import Link from "next/link";

export default function DashboardAboutPage() {
  const { status } = useSession();
  function EditExtra(item: string) {
    return (
      console.log(`${item}`)
    )
  }
  function DeleteExtra(item: string) {
    return (
      console.log(`${item}`)
    )
  }
  function EditProgram(item: string) {
    return (
      console.log(`${item}`)
    )
  }
  function DeleteProgram(item: string) {
    return (
      console.log(`${item}`)
    )
  }
  const router = useRouter();
  console.log(status);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin")
    }
  }, [router, status]);
  return (
    <>
      <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10 ">
        <h1 className="text-hijau text-4xl font-bold">Fasilitas</h1>
        <Link href={"/admin/dashboard/about/add"} className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Tambah</Link>
        <div className="w-full flex flex-col justify-between gap-10">
          <span className="w-full flex-col lg:flex-row flex flex-wrap justify-around items-center gap-y-7">
            <div className="group w-full lg:w-[45%] flex mx-auto flex-col items-start">
              <span className="inline-block overflow-hidden rounded-md w-full md:max-w-[900px] xl:h-72 h-56">
                <Image className="w-full h-full hover:scale-110 duration-300 object-cover object-center" src={Wkk} alt="" width={800} height={800}></Image>
              </span>
              <h1 className="text-2xl text-hijau font-bold group-hover:translate-x-4 group-hover:scale-105 duration-300">ytta</h1>
            </div>
            <div className="group w-full lg:w-[45%] flex mx-auto flex-col items-start">
              <span className="inline-block overflow-hidden rounded-md w-full md:max-w-[900px] xl:h-72 h-56">
                <Image className="w-full h-full hover:scale-110 duration-300 object-cover object-center" src={Wkk} alt="" width={800} height={800}></Image>
              </span>
              <h1 className="text-2xl text-hijau font-bold group-hover:translate-x-4 group-hover:scale-105 duration-300">ytta</h1>
            </div>
            <div className="group w-full lg:w-[45%] flex mx-auto flex-col items-start">
              <span className="inline-block overflow-hidden rounded-md w-full md:max-w-[900px] xl:h-72 h-56">
                <Image className="w-full h-full hover:scale-110 duration-300 object-cover object-center" src={Wkk} alt="" width={800} height={800}></Image>
              </span>
              <h1 className="text-2xl text-hijau font-bold group-hover:translate-x-4 group-hover:scale-105 duration-300">ytta</h1>
            </div>
          </span>
          <span className="w-full flex flex-row flex-wrap justify-around items-center gap-y-7">
            <div className="inline-block lg:w-[43%] w-full mx-auto min-h-40 py-4 bg-second rounded-md">
              <span className="w-11/12 flex flex-col mx-auto gap-4 mt-4">
                <h1 className="font-bold text-2xl">Extrakuliner</h1>
                <Link href={"/admin/dashboard/about/add"} className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Tambah</Link>
                <table border={1} className="w-full">
                  <thead>
                    <tr>
                      <th>no</th>
                      <th className="text-start pl-6">nama</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["anjai", "test", "cah", "cok", "ytta", "tessss"].map((item, loop) => (
                      <tr key={item}>
                        <td className="text-center">{loop + 1}</td>
                        <td className="pl-6">{item}</td>
                        <td className="flex gap-4 justify-center">
                          <button onClick={() => EditExtra(item)}>Edit</button>
                          <button onClick={() => DeleteExtra(item)}>delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </span>
            </div>
            <div className="inline-block lg:w-[43%] w-full mx-auto min-h-40 py-4 bg-second rounded-md">
              <span className="w-11/12 flex flex-col mx-auto gap-4 mt-4">
                <h1 className="font-bold text-2xl">Program</h1>
                <Link href={"/admin/dashboard/about/add"} className="px-4 flex items-center  py-3 w-[100px] h-10 bg-blue-600 text-white rounded">Tambah</Link>
                <table border={1} className="w-full">
                  <thead>
                    <tr>
                      <th>no</th>
                      <th className="text-start pl-6">nama</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["anjai", "test", "cah", "cok", "ytta", "tessss"].map((item, loop) => (
                      <tr key={item}>
                        <td className="text-center">{loop + 1}</td>
                        <td className="pl-6">{item}</td>
                        <td className="flex gap-4 justify-center">
                          <button onClick={() => EditProgram(item)}>Edit</button>
                          <button onClick={() => DeleteProgram(item)}>delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </span>
            </div>
          </span>
        </div>
      </div>
    </>
  )
}