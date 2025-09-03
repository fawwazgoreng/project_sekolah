import Image from "next/image";
import Wkk from "@/public/wkk.jpeg";
import { UploadPage } from "@/app/component/inputfile";

export default function DashboardPage() {



  return (
    <>
      <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10 ">
        <h1 className="text-hijau text-4xl font-bold">Slide</h1>
        <UploadPage />
        <span className="w-full flex-col lg:flex-row flex flex-wrap justify-around items-center gap-y-7">
          <span className=" w-full overflow-hidden rounded-md lg:w-[45%] lg:max-w-[900px] ">
            <Image className="w-full xl:h-72 h-56 object-cover object-center" src={Wkk} alt="" width={800} height={800}></Image>
            <button className="my-2 py-2 px-4 w-20 text-center bg-red-600 text-white font-bold rounded-md">Hapus</button>
          </span>
          <span className=" w-full overflow-hidden rounded-md lg:w-[45%] lg:max-w-[900px] ">
            <Image className="w-full xl:h-72 h-56 object-cover object-center" src={Wkk} alt="" width={800} height={800}></Image>
            <button className="my-2 py-2 px-4 w-20 text-center bg-red-600 text-white font-bold rounded-md">Hapus</button>
          </span>
          <span className=" w-full overflow-hidden rounded-md lg:w-[45%] lg:max-w-[900px] ">
            <Image className="w-full xl:h-72 h-56 object-cover object-center" src={Wkk} alt="" width={800} height={800}></Image>
            <button className="my-2 py-2 px-4 w-20 text-center bg-red-600 text-white font-bold rounded-md">Hapus</button>
          </span>
        </span>
      </div>
    </>
  )
}