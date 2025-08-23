import { CardProgram } from "@/app/component/CardProgram";
import { Card } from "@/app/component/card"

export default function PPLG () {
    return (
        <div className="sm:pb-44">
            <p className="w-11/12 flex mx-auto text-hijau font-bold text-[24px] md:text-[32px] my-10"><span className="underline decoration-[7px] underline-offset-[10px]">Tekn</span>ik Komputer dan jaringan</p>
            <Card Arrow={false}></Card>
            <CardProgram title="Program Keahlian Teknik Jaringan Komputer dan Telekomunikasi (TJKT) adalah jurusan di Sekolah Menengah Kejuruan (SMK) yang berfokus pada teknologi informasi dan komunikasi, khususnya jaringan komputer dan telekomunikasi. Siswa TJKT akan belajar merakit, menginstal, merawat, dan memperbaiki komputer serta jaringannya. Mereka juga akan mempelajari dasar-dasar jaringan, keamanan jaringan, dan teknologi telekomunikasi terkini. "/>
        </div>
    )
}