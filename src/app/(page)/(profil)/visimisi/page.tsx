export default function VisiMisi() {
    return (
        <>
            <div className=" w-full ">
                <p className="text-hijau ml-10 font-bold text-[24px] md:text-[32px]">
                    <span className="underline decoration-7 underline-offset-8 ">Visi,</span>Misi,Dan Moto</p>
                <div className=" flex flex-col flex-wrap justify-around items-center w-5/6 mx-auto mt-35 md:flex-row">
                    <div className=" w-full group md:w-1/2 max-w-[400px] h-[350px] md:h-[400px] shadow-lg inset-shadow-xs rounded-md group p-4 ">
                        <p className="font-medium text-[30px] mt-12 text-center group-hover:text-hijau md:text-[44px]">Visi</p>
                        <article className="text-center lg:mt-10 mt-5 text-wrap font-extralight md:mx-10 mx-4 group-hover:font-bold italic group-hover:not-italic text-black">
                            <p>Menjadi sekolah kejuruan teladan berbudaya lingkungan yang unggul dalam pendidikan karakter yang berakhlaq mulia dengan kompetensi di bidang bisnis dan manajemen serta teknologi informasi dan komunikasi.</p>
                        </article>
                    </div>
                    <div className="w-full group md:w-1/2 max-w-[400px] h-[350px] md:h-[400px] shadow-lg inset-shadow-xs rounded-md group p-4 ">
                        <p className="font-medium text-[35px] mt-12 text-center group-hover:text-hijau  md:text-[44px]">Moto</p>
                        <article className="text-center lg:mt-10 mt-5 text-wrap font-extralight md:mx-10 mx-4 group-hover:font-bold italic group-hover:not-italic text-black">
                            <p>“Ilmu yang Amaliah, Amal yang ilmiah, Akhlaqul Karimah”</p>
                        </article>
                    </div>
                    <div className="w-full group lg:w-2/3 h-96 shadow-lg inset-shadow-xs rounded-md group  max-w-[550px] md:mt-20">
                        <p className="font-medium text-[35px] mt-12 text-center group-hover:text-hijau  md:text-[44px] ">Misi</p>
                        <ul className="list-decimal list-inside  w-140 h-60 ml-3 font-extralight group-hover:font-bold italic group-hover:not-italic text-black text-[14px] md:text-[15px] md:w-100%">
                            <li className="w-150 "> Melaksanakan pendidikan kejuruan yang berkarakter kebangsaan, kewirausahaan, dan berbudaya lingkungan, yang relevan dengan kebutuhan dunia usaha/industri dan masyarakat.</li>
                            <li>Membina jejaring kerjasama dengan potensi pengembangan sumberdaya manusia, inovasi tepat guna, dan kemajuan dunia usaha dan industri.</li>
                            <li>Menyelenggarakan gerakan cinta tanah air, kepedulian lingkungan dan tanggung jawab sosial sekolah kepada masyarakat.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}