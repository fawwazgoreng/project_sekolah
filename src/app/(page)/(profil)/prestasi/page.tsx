"use client"
import Image from "next/image"
import Adit from "@/public/adit-1024x768 1.png";
import PSholikin from "@/public/p.solikin 1.png";
import { useState } from "react";



export default function Prestasi() {
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="w-full h-auto">
            <div className="lg:w-[95%] w-11/12 mx-auto flex flex-col gap-7 text-black ">
                <p className="text-hijau font-bold text-[24px] md:text-[32px]">
                    <span className="underline decoration-[7px] underline-offset-[8px] ">
                        Pres
                    </span>
                    tasi
                </p>
                <p className="font-bold sm:text-[18px] text-[16px] md:text-[24px]">
                    SMK Wikrama 1 Jepara memiliki sejumlah prestasi yang membanggakan, baik
                    di bidang akademik maupun non-akademik. Beberapa prestasi yang menonjol
                    antara lain
                </p>
                <div className="flex flex-col gap-20 w-full">
                    <div className=" max-w-full overflow-hidden md:flex-row  justify-center  shadow-lg inset-shadow-xs rounded-[14px] flex flex-col gap-5 pr-2">
                        <Image
                            className="md:rounded-[14px] object-cover object-center w-full md:w-1/2 xl:w-1/3 h-auto"
                            src={PSholikin}
                            width={800}
                            height={800}
                            alt="Picture of the author"
                        ></Image>
                        <div className="w-11/12 flex flex-col mx-auto md:w-1/2 lg:w-2/3 mt-3">
                            <article className="w-full text-wrap flex flex-col gap-2 md:gap-1 lg:gap-2">
                                <p className="font-bold text-[18px] md:text-[16px]">
                                    SMK Wikrama 1 Jepara Juara I LKS Software Aplication Kabupaten
                                    Jepara Tahun 2016
                                </p>
                                <p className="font-light md:text-[15px] lg:text-[17px]">
                                    SMK Wikrama 1 Jepara kembali mempertahankan prestasi sebagai
                                    Juara pada penyelenggaraan LKS Tingkat Kabupaten Jepara tahun
                                    2016. Pada tahun ini SMK Wikrama 1 Jepara mengikuti tiga jenis
                                    lomba yaitu : Software Aplication, Web Design dan Network
                                    Administration.
                                </p>
                                {showMore && (
                                    <>
                                        <p className="font-light pb-2 flex sm:hidden">
                                            LKS bidang Lomba Software Aplication diselenggarakan di SMK
                                            Wikrama 1 Jepara. Lomba Software Aplication diwakili oleh Nur
                                            Kholis Majid kelas XII RPL sebagai juara bertahan berhasil
                                            merebut kembali gelar sebagai juara 1. Sebelumnya di tempat
                                            terpisah diselenggarakan LKS bidang lomba Web Design di SMK
                                            Negeri 1 Pakis Aji Jepara pada tanggal 8 Agustus 2016, SMK
                                            Wikrama 1 Jepara keluar sebagai juara 1 yang diwakili oleh A.
                                            Syahidu K Kelas XII RPL. Sedangkan untuk mata lomba IT Network
                                            Support wikrama bertahan di posisi Runner-UP yang diwakili oleh
                                            Bayu Didit yang diselenggarakan di SMK Walisongo Pecangaan pada
                                            tanggal 6 Agustus 2016. Semoga hasil ini makin meningkatkan mutu
                                            pendidikan bagi SMK Wikrama 1 Jepara, lebih luas lagi bagi
                                            Wikrama … Untuk Indonesia !
                                        </p>
                                    </>
                                )}
                                {!showMore && (
                                    <button onClick={() => setShowMore(true)} className="text-blue-700 sm:hidden">
                                        Show more
                                    </button>
                                )}
                                <p className="font-light pb-2 hidden sm:flex md:text-[15px] lg:text-[17px] ">
                                    LKS bidang Lomba Software Aplication diselenggarakan di SMK
                                    Wikrama 1 Jepara. Lomba Software Aplication diwakili oleh Nur
                                    Kholis Majid kelas XII RPL sebagai juara bertahan berhasil
                                    merebut kembali gelar sebagai juara 1. Sebelumnya di tempat
                                    terpisah diselenggarakan LKS bidang lomba Web Design di SMK
                                    Negeri 1 Pakis Aji Jepara pada tanggal 8 Agustus 2016, SMK
                                    Wikrama 1 Jepara keluar sebagai juara 1 yang diwakili oleh A.
                                    Syahidu K Kelas XII RPL. Sedangkan untuk mata lomba IT Network
                                    Support wikrama bertahan di posisi Runner-UP yang diwakili oleh
                                    Bayu Didit yang diselenggarakan di SMK Walisongo Pecangaan pada
                                    tanggal 6 Agustus 2016. Semoga hasil ini makin meningkatkan mutu
                                    pendidikan bagi SMK Wikrama 1 Jepara, lebih luas lagi bagi
                                    Wikrama … Untuk Indonesia !
                                </p>
                            </article>
                        </div>
                    </div>
                    <div className=" max-w-full overflow-hidden md:flex-row  justify-center  shadow-lg inset-shadow-xs rounded-[14px] flex flex-col gap-5 pr-2">
                        <Image
                            className="md:rounded-[14px] object-cover object-center w-full md:w-1/2 xl:w-1/3 h-auto"
                            src={Adit}
                            width={800}
                            height={800}
                            alt="Picture of the author"
                        ></Image>
                        <div className="w-11/12 flex flex-col mx-auto md:w-1/2 lg:w-2/3 mt-3">
                            <article className="w-full text-wrap flex flex-col gap-2 md:gap-1 lg:gap-2">
                                <p className="font-bold text-[18px] md:text-[16px]">
                                    Juara 1 LKS (Lomba Kompetensi Sekolah) Se – Kabupaten Jepara
                                </p>
                                <p className="font-light md:text-[15px] lg:text-[17px]">
                                    Kamis, 06 September 2018 SMK Wikrama 1 Jepara mengikuti 2
                                    kompetisi sekaligus yang diikuti SMK SMK se – kabupaten jepara
                                    yaitu LKS (Lomba Kompetensi Sekolah)  Web Design yang diikuti
                                    oleh salah satu siswa dari jurusan RPL(Rekayasa Perangkat Lunak)
                                    dan IT Software Aplication yang diikuti oleh salah satu siswa
                                    dari jurusan RPL(Rekayasa Perangkat Lunak).
                                </p>
                                {showMore && (
                                    <>
                                        <p className="font-light pb-2 flex sm:hidden">
                                            Dan untuk IT Software Aplication yang mana membuat sebuah
                                            Aplikasi Perpustakaan Sekolah yang digunakan untuk membantu
                                            petugas perpustakaan agar tidak kesusahan dalam mealayani siswa
                                            – siswi dalam peminjaman buku. Fitur – fitur aplikasi tersebut
                                            meliputi Input Buku, Input Anggota, Input User, Transaksi
                                            peminjaman, Transaksi pengembalian, Laporan Peminjaman, dan
                                            Pengembalian. Kompetisi tersebut berlangsung selama 1 hari
                                            mualai dari jam 09.00 WIB sampai 17.00 WIB
                                        </p>
                                    </>
                                )}
                                {!showMore && (
                                    <button onClick={() => setShowMore(true)} className="text-blue-700 sm:hidden">
                                        Show more
                                    </button>
                                )}
                                <p className="font-light pb-2 hidden sm:flex md:text-[15px] lg:text-[17px] ">
                                    Dan untuk IT Software Aplication yang mana membuat sebuah
                                    Aplikasi Perpustakaan Sekolah yang digunakan untuk membantu
                                    petugas perpustakaan agar tidak kesusahan dalam mealayani siswa
                                    – siswi dalam peminjaman buku. Fitur – fitur aplikasi tersebut
                                    meliputi Input Buku, Input Anggota, Input User, Transaksi
                                    peminjaman, Transaksi pengembalian, Laporan Peminjaman, dan
                                    Pengembalian. Kompetisi tersebut berlangsung selama 1 hari
                                    mualai dari jam 09.00 WIB sampai 17.00 WIB
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}