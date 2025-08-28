"use client"
import Image from "next/image";
import wikrama from "@/public/wikrama.png";
import wa from "@/public/WhatsApp.png";
import Facebook from "@/public/Facebook.png";
import Instagram from "@/public/Instagram.png";
import Yt from "@/public/YouTube.png";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const NavBar = () => {
      const pathname = usePathname();
  const linkClass = (path: string) =>
    `cursor-pointer hover:text-blue-500 ${
      pathname === path ? "text-blue-500" : "text-black"
    }`;
    const [isActive, setIsActiv] = useState(false);
    const ToggleNavbar = () => {
        setIsActiv(!isActive);
    }
    return (
        <>
            <div className="container-fluid w-full py-2 text-white bg-hijau hidden md:flex">
                <div className="md:flex w-11/12 xl:w-10/12 mx-auto items-center hidden">
                    <span className="flex items-center justify-start w-1/6">
                    <Link href={""} target="blank" className="flex items-center gap-1">
                        <Image className="lg:w-8 md:w-6" src={wa} alt="" width={400} height={400} />
                        <p className="font-extrabold text-[10px] lg:text-[15px]">123-456-789</p>
                    </Link>
                    </span>
                    <p className=" hidden text-[10px] lg:text-[13px] xl:text-[15px] md:flex w-4/6 items-center justify-center">Jl. Kelet Ploso No.KM 36, Karang Anyar, Kelet, Kec. Keling, Kabupaten Jepara, Jawa Tengah 59454</p>
                    <span className="flex w-1/6 justify-end">
                    <Link href={""} target="blank">
                        <Image className="lg:w-8 md:w-6" src={Facebook} alt="" width={400} height={400} />
                    </Link>
                    <Link href={""} target="blank">
                        <Image className="lg:w-8 md:w-6" src={Instagram} alt="" width={400} height={400} />
                    </Link>
                    <Link href={""} target="blank">
                        <Image className="lg:w-8 md:w-6" src={Yt} alt="" width={400} height={400} />
                    </Link>
                    </span>
                </div>
            </div>
            <nav className="container-fluid w-full bg-white">
                <div className="w-11/12 py-6 flex mx-auto">
                    <Image src={wikrama} className="w-[290px] xl:w-[370px]"
                        width={800} height={800} alt="wikrama logo">
                    </Image>
                    <div className="hidden Nav lg:flex w-full justify-around items-center text-[16px] font-semibold">
                        <Link href={"/"} className={linkClass("/")}>Home</Link>
                        <div className="NavActive group">
                            <p className={`cursor-pointer ${linkClass("/prestasi")} ${linkClass("/komite")} ${linkClass("/sejarah")} ${linkClass("/visimisi")}`}>Profil</p>
                            <div className="opacity-0 duration-500 w-40 -translate-x-2 flex flex-col h-0 group-hover:h-32 group-hover:opacity-100 bg-white top-[112px] xl:top-32 overflow-hidden absolute z-10 justify-around text-[15px] text-black">
                                <div className="max-h-5 lg:max-h-10 lg:h-10"></div>
                                <Link href={"/sejarah"} className={`p-2 ${linkClass("/sejarah")}`}>Sejarah</Link>
                                <Link href={"/visimisi"} className={`p-2 ${linkClass("/visimisi")}`}>Visi , Misi dan Moto</Link>
                                <Link href={"/prestasi"} className={`p-2 ${linkClass("/prestasi")}`}>Prestasi</Link>
                            </div>
                        </div>
                        <Link href={"/berita"} className={`${linkClass("/berita")}`}>Berita</Link>
                        <Link href={"/kurikulum"} className={`${linkClass("/kurikulum")}`}>Kurikulum</Link>
                        <Link href={"/kesiswaan"} className={`${linkClass("/kesiswaan")}`}>Kesiswaan</Link>
                        <Link href={"/ppdb"} className={`${linkClass("/ppdb")}`}>PPDB 2025/2026</Link>
                    </div>
                    <div className={isActive ? "menu menuActive" : "menu"}>
                        <button className=" opacity-0 z-50 w-10 h-10 absolute lg:hidden " onClick={ToggleNavbar}></button>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
            <aside className={isActive ? "aside text-white duration-300" : "text-white asideNonActive duration-300"}>
                <Link href={"/"} className="hover:bg-blue-500 py-0.5 duration-500 pl-10">Home</Link>
                <Link href={"/sejarah"} className="hover:bg-blue-500 py-0.5 duration-500 pl-10">Sejarah</Link>
                <Link href={"/visimisi"} className="hover:bg-blue-500 py-0.5 duration-500 pl-10">Visi , misi dan moto</Link>
                <Link href={"/prestasi"} className="hover:bg-blue-500 py-0.5 duration-500 pl-10">Prestasi</Link>
                <Link href={"/berita"} className="hover:bg-blue-500 py-0.5 duration-500 pl-10">Berita</Link>
                <Link href={"/kurikulum"} className="hover:bg-blue-500 py-0.5 duration-500 pl-10">Kurikulum</Link>
                <Link href={"/kesiswaan"} className="hover:bg-blue-500 py-0.5 duration-500 pl-10">Kesiswaan</Link>
                <Link href={"/ppdb"} className="hover:bg-blue-500 py-0.5 duration-500 pl-10">PPDB 2025/2026</Link>
            </aside>
        </>
    );
};

export default NavBar;