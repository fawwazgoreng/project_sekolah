import Sejarah from "../../sejarah/page"
import Wkk from "@/public/wkk.jpeg";
import Image from "next/image";

export default function Profil() {
    return (
        <>
            <Sejarah />
            <div className="w-full h-44 bg-transparent"></div>
            <div className="w-5/6 md:w-11/12 flex gap-8 flex-col mx-auto">
                <p className="text-hijau  font-bold text-[24px] md:text-[32px]"><span className="underline decoration-[7px] underline-offset-[10px]">Fasi</span>litas</p>
                <div className="flex flex-wrap w-full justify-center mx-auto gap-4">
                    <span className="border-black lg:w-[32%] justify-between h-72 lg:h-80 sm:w-[45%] w-full max-w-[500px]">
                        <div className="w-full h-52 lg:h-64 overflow-hidden rounded-md">
                            <Image src={Wkk} alt="" className="w-full h-52 lg:h-64 object-cover hover:scale-125 duration-500 object-center" />
                        </div>
                        <p className="text-center text-xl mt-2 font-bold text-hijau">Lorem ipsum dolor sit amet.</p>
                    </span>
                    <span className="border-black lg:w-[32%] justify-between h-72 lg:h-80 sm:w-[45%] w-full max-w-[500px]">
                        <div className="w-full h-52 lg:h-64 overflow-hidden rounded-md">
                            <Image src={Wkk} alt="" className="w-full h-52 lg:h-64 object-cover hover:scale-125 duration-500 object-center" />
                        </div>
                        <p className="text-center text-xl mt-2 font-bold text-hijau">Lorem ipsum dolor sit amet.</p>
                    </span>
                    <span className="border-black lg:w-[32%] justify-between h-72 lg:h-80 sm:w-[45%] w-full max-w-[500px]">
                        <div className="w-full h-52 lg:h-64 overflow-hidden rounded-md">
                            <Image src={Wkk} alt="" className="w-full h-52 lg:h-64 object-cover hover:scale-125 duration-500 object-center" />
                        </div>
                        <p className="text-center text-xl mt-2 font-bold text-hijau">Lorem ipsum dolor sit amet.</p>
                    </span>
                    <span className="border-black lg:w-[32%] justify-between h-72 lg:h-80 sm:w-[45%] w-full max-w-[500px]">
                        <div className="w-full h-52 lg:h-64 overflow-hidden rounded-md">
                            <Image src={Wkk} alt="" className="w-full h-52 lg:h-64 object-cover hover:scale-125 duration-500 object-center" />
                        </div>
                        <p className="text-center text-xl mt-2 font-bold text-hijau">Lorem ipsum dolor sit amet.</p>
                    </span>
                    <span className="border-black lg:w-[32%] justify-between h-72 lg:h-80 sm:w-[45%] w-full max-w-[500px]">
                        <div className="w-full h-52 lg:h-64 overflow-hidden rounded-md">
                            <Image src={Wkk} alt="" className="w-full h-52 lg:h-64 object-cover hover:scale-125 duration-500 object-center" />
                        </div>
                        <p className="text-center text-xl mt-2 font-bold text-hijau">Lorem ipsum dolor sit amet.</p>
                    </span>
                </div>
            </div>
            <div className="w-full h-44 bg-transparent"></div>
            <div className="w-5/6 md:w-11/12 flex gap-8 flex-col mx-auto">
            <h1 className="text-center w-full text-3xl font-bold text-hijau underline decoration-[5px] underline-offset-[10px]">pengembangan diri</h1>
            <div className="w-full flex flex-wrap gap-y-24 justify-between">
                <span className="md:w-[43%] w-full">
                    <h1 className="text-2xl pb-5">Extrakulikuner : </h1>
                    <ol type="1" className="text-lg">
                        <li>yttts</li>
                        <li>yttts</li>
                        <li>yttts</li>
                        <li>yttts</li>
                        <li>yttts</li>
                        <li>yttts</li>
                    </ol>
                </span>
                <span className="md:w-[43%] w-full">
                    <h1 className="text-2xl pb-5">program pembelajaran : </h1>
                    <ol type="1" className="text-lg">
                        <li>yttts</li>
                        <li>yttts</li>
                        <li>yttts</li>
                        <li>yttts</li>
                        <li>yttts</li>
                        <li>yttts</li>
                    </ol>
                </span>
            </div>
            </div>
        </>
    )
}