import Image from "next/image"
import Message1 from "@/public/masage 2.png";
import Message2 from "@/public/masage 2 (1).png";

export default function PPDB() {
    return (
        <>
            <div className="w-full md:mt-20 ">
                <div className="w-full h-120 flex flex-col justify-center items-center gap-10 md:gap-14 lg:gap-20 md:flex-row">
                    <div className=" mt-30 w-50 h-80  flex flex-col  justify-center items-center md:w-80 md:h-100 md:mt-0 ">
                        <Image className=" w-1/2 h-auto " src={Message1} alt="" width={800} height={800}></Image>
                        <p className=" text-center w-70 h-10 mt-4 text-[16px] md:text-[22px]  font- font-extrabold ">Hubungi Kami</p>
                        <p className="  text-center w-50 h-10  font-bold text-[13px] md:text-[18px] md:w-70 md:mt-0">Kesulitan mengisi formulir pendaftaran? klik di sini</p>
                        <div className=" md:mt-5 mt-2 py-2 px-5  hover:text-white  rounded-xl border text-center transition delay-0 duration-200 ease-in-out hover:bg-second ">
                            <p className="font-light">Hubungi Kami</p>
                        </div>
                    </div>
                    <div className="  w-50 h-80 md:w-80 md:h-100  flex flex-col justify-center items-center ">
                        <Image className="w-1/2 h-auto" src={Message2} alt="" width={800} height={800}></Image>
                        <p className="  text-center w-70 h-10 mt-4 text-[16px] md:text-[22px]  font- font-extrabold ">Isi Formulir</p>
                        <p className="text-center w-50 h-10  font-bold text-[13px] md:text-[18px] md:w-70 md:mt-0">Bagi Siswa Pendaftar Baru
                            silahkan isi Formulir Disini</p>
                        <div className=" md:mt-5 mt-2 py-2 px-5  hover:text-white  rounded-xl border text-center transition delay-0 duration-200 ease-in-out hover:bg-second ">
                            <p className="font-light">Isi Formulir</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}