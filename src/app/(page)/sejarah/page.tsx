import Image from "next/image";
import Wikrama from "@/public/WikramaOFO.png";

export default function Sejarah() {
    return (
        <>
            <div className="w-5/6 md:w-11/12 flex flex-col mx-auto h-auto">
                <p className="text-hijau  font-bold text-[24px] md:text-[32px]"><span className="underline decoration-[7px] underline-offset-[10px]">Seja</span>rah</p>
                <div className=" mt-10 w-full shadow-xl h-auto overflow-hidden rounded-lg flex flex-col lg:gap-10 gap-5 lg:flex-row">
                    <Image className="w-full lg:w-1/2 object-cover object-center" alt="" src={Wikrama} width={800} height={800}></Image>
                    <article className=" text-black text-left text-wrap lg:w-1/2 text-[20px]">
                        <p className="text-[20px] lg:mt-5 md:text-[22px] p-2 "> <span className="font-bold text-[22px] md:text-[24px]">SMK Wikrama 1 Jepara </span> didirikan pada tanggal 1 Juni 2011 di bawah naungan Yayasan Nurussalam Kelet Jepara. Yayasan ini juga menaungi beberapa lembaga pendidikan lain di Kelet, Jepara. SMK Wikrama 1 Jepara menerapkan manajemen yang dikonsultasikan oleh IDS Consultant, sebuah lembaga konsultan pendidikan berbasis teknologi, yang juga pernah bekerja sama dengan SMK Wikrama Bogor. </p>
                    </article>
                </div>
            </div>
        </>
    )
}