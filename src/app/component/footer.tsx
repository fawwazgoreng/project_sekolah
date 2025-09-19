import Image from "next/image"
import wa from "@/public/WhatsApp.png";
import Facebook from "@/public/Facebook.png";
import Instagram from "@/public/Instagram.png";
import Yt from "@/public/YouTube.png";
import Link from "next/link";

export const Footer = () => {
    return (
        <div className="relative">
            <div className="bg-hijau w-full h-100 pt-14 pb-8 absolute top-full mt-40 text-white">
                <div className="flex w-11/12 lg:w-4/6 mx-auto justify-center flex-wrap sm:flex-nowrap gap-4">
                    <div className="w-8 sm:w-12 flex flex-col justify-between gap-2">
                        <Link href={"https://www.facebook.com/mtsmu.plaosan"} target="blank">
                            <Image className="w-8 lg:w-[44px]" src={Facebook} alt="" width={400} height={400} />
                        </Link>
                        <Link href={"https://wa.me/6285328160551?text=Halo%20saya%20ingin%20bertanya"} target="blank">
                            <Image className="w-8 lg:w-[44px]" src={wa} alt="" width={400} height={400} />
                        </Link>
                        <Link href={"https://www.instagram.com/mtsmuplaosan/"} target="blank">
                            <Image className="w-8 lg:w-[44px]" src={Instagram} alt="" width={400} height={400} />
                        </Link>
                        <Link href={"https://www.youtube.com/@mtsmuplaosan9909"} target="blank">
                            <Image className="w-8 lg:w-[44px]" src={Yt} alt="" width={400} height={400} />
                        </Link>
                    </div>
                    <div className="w-4/5 md:w-1/2 md:ml-10">
                        <h2 className="font-bold md:text-[25px] lg:text-[30px] text-lg">Menu</h2>
                        <span className="flex gap-2 lg:gap-10 mx-auto justify-around">
                            <ul className=" md:w-1/3 w-24 lg:leading-9 leading-6 mt-1 text-[13px] md:text-[15px] lg:text-[17px] font-extralight">
                                <li><Link href={"/"}>Home</Link></li>
                                <li><Link href={"/profil"}>About</Link></li>
                                <li><Link href={"/berita"}>Berita</Link></li>
                                <li><Link href={"/ppdb"}>PPDB Online</Link></li>
                            </ul>
                            <ul className=" w-2/3 lg:leading-9 leading-6 lg:ml-1 mt-1 text-[13px] md:text-[15px] lg:text-[17px] font-extralight">
                                <li><Link href={"/kurikulum"}>Kurikulum</Link></li>
                                <li><Link href={"/kesiswaan"}>Gallery</Link></li>
                                <li><Link href={"/visimisi"}>Visi dan Misi</Link></li>
                            </ul>
                        </span>
                    </div>
                    <div className="w-full lg:w-96 sm:text-left md:w-1/3 mt-5 text-center sm:mt-0">
                        <h2 className="font-bold md:text-[25px] lg:text-[30px] text-lg">Alamat</h2>
                        <article className="">
                            <p className="font-bold mt-1  md:text-[16px] text-[13px] md:leading-8">Jl. Kauman No.2, RT.04/RW.01, Cepoko, Ngagel, Kec. Dukuhseti, Kabupaten Pati, Jawa Tengah 59158</p>
                        </article>
                    </div>
                </div>
                <div className="w-full text-[12px] sm:text-[13px] md:text-[15px] lg:text-[20px] text-center mt-16 text-nowrap ">
                    <p>Copyright MTs mu manahijul ulum plaosan pati . Alll right Reserved</p>
                </div>
            </div >
        </div>
    )
}