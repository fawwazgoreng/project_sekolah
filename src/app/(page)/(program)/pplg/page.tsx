import { CardProgram } from "@/app/component/CardProgram";
import { Card } from "@/app/component/card"

export default function PPLG () {
    return (
        <div className="sm:pb-44">
            <p className="w-11/12 flex mx-auto text-hijau font-bold text-[24px] md:text-[32px] my-10"><span className="underline decoration-[7px] underline-offset-[10px]">Reka</span>yasa perangkat lunak</p>
            <Card Arrow={false}></Card>
            <CardProgram title="Program Jurusan RPL adalah singkatan dari Rekayasa Perangkat Lunak, jurusan yang berfokus pada pengembangan, pemeliharaan, dan pengelolaan perangkat lunak atau software. Di jurusan ini, siswa akan mempelajari berbagai aspek terkait pemrograman, desain, dan pengembangan aplikasi berbasis web, mobile, dan desktop, serta sistem informasi. "/>
        </div>
    )
}