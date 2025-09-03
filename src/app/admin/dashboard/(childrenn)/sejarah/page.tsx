"use client"
import Image from "next/image"
import Wkk from "@/public/wkk.jpeg";

export default function SejarahAdmin() {
    return (
        <>
            <div className="w-full h-full  flex flex-col justify-center">
                <h1 className="text-hijau text-4xl font-bold">Sejarah</h1>
                <input type="text" defaultValue={"Smk wikrama 1 jepara"} name="name" className="p-2 my-5 text-2xl text-hijau font-bold"/>
                <div className=" w-full flex flex-col lg:flex-row self-center  rounded-md shadow-lg inset-shadow-xs mt-2 gap-3">
                    <Image
                        className=" object-cover w-full lg:w-1/2 h-96 rounded-md"
                        src={Wkk}
                        width={500}
                        height={500}
                        alt="Picture of the author" />
                    <form action="" className=" w-full items-center flex flex-col">
                        <textarea defaultValue={"sdasdfaf"} placeholder="sejarah sekolah mu..." className="p-2 w-full h-full shadow-lg inset-shadow-xs text-[15px] md:text-[20px]  text-black font-light resize-none" />
                    </form>
                </div>
            </div>
        </>
    )
}