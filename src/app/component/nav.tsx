"use client"
import Image from "next/image";
import logo from "@/public/logo.png";
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
                    <Link href={"https://wa.me/6285328160551?text=Halo%20saya%20ingin%20bertanya"} target="blank" className="flex items-center gap-1">
                        <Image className="lg:w-8 md:w-6" src={wa} alt="" width={400} height={400} />
                        <p className="font-extrabold text-[10px] lg:text-[15px]">853-2816-0551</p>
                    </Link>
                    </span>
                    <p className=" hidden text-[9px] lg:text-[12px] xl:text-[14px] md:flex w-4/6 items-center justify-center">Jl. Kauman No.2, RT.04/RW.01, Cepoko, Ngagel, Kec. Dukuhseti, Kabupaten Pati, Jawa Tengah 59158</p>
                    <span className="flex w-1/6 justify-end">
                    <Link href={"https://www.facebook.com/mtsmu.plaosan"} target="blank">
                        <Image className="lg:w-8 md:w-6" src={Facebook} alt="" width={400} height={400} />
                    </Link>
                    <Link href={"https://www.instagram.com/mtsmuplaosan/"} target="blank">
                        <Image className="lg:w-8 md:w-6" src={Instagram} alt="" width={400} height={400} />
                    </Link>
                    <Link href={"https://www.youtube.com/@mtsmuplaosan9909"} target="blank">
                        <Image className="lg:w-8 md:w-6" src={Yt} alt="" width={400} height={400} />
                    </Link>
                    </span>
                </div>
            </div>
            <nav className="container-fluid w-full bg-white">
                <div className="w-11/12  py-6 flex mx-auto">
                <div className=" ml-5 lg:w-[550px] w-[1200px] flex gap-5 flex-row flex-nowrap">
                    <Image src={logo} className="w-20 h-auto"
                        width={800} height={800} alt="logo">
                    </Image>
                    <span className=" h-5/6 self-center  flex flex-col justify-center leading-none text-black w-full">
                        <p className="md:text-xl text-md leading-none normal-case">Kh hasyim asy&apos;ari</p>
                        <p className="lg:text-3xl sm:text-2xl text-xl font-bold leading-none">MTs manahijul ulum</p>
                        <p className="text-sm leading-none">Plaosan-Cluwak-Pati</p>
                    </span>
                </div>
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