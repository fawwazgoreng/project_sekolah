import Image from "next/image";
import Warranty from "@/public/Warranty.png";
import Wkk from "@/public/wkk.jpeg";
import Laptop from "@/public/Laptop.png";
import Graduation from "@/public/Graduation Cap.png";
import Stairs from "@/public/Stairs Up.png";
import Factory from "@/public/Factory.png";
import A from "@/public/a.png";
import Tjkt from "@/public/tjkt.png";
import { Card } from "./component/card";
import Link from "next/link";
import Wa from "@/public/WhatsApp.png";
import Berita from "./component/berita";

export default function Home() {
  return (
    <>
      <Card Arrow={true}/>
      <div className="sm:left-[10%] bg-white rounded-md shadow-lg w-full sm:w-4/5 h-24 lg:h-32 flex absolute z-10 sm:top-[450px] top-80 md:top-[490px] lg:top-[650px]">
        <span className="w-11/12 flex mx-auto flex-nowrap items-center justify-between">
          <h3 className="sm:w-3/4 w-1/2 text-[17px] lg:text-[25px] text-hijau font-extrabold">Informasi Dan Pendaftaran Siswa Baru</h3>
          <Link href={""} className="sm:w-1/4 w-40 h-1/2 flex bg-hijau p-2 rounded-lg items-center gap-2 justify-center text-white hover:bg-blue-500 duration-500">
            <Image className="w-8 lg:w-[44px]" src={Wa} alt="" width={800} height={800}></Image>
            <p className="text-[14px] md:text-[17px] lg:text-[21px]">Informasi</p>
          </Link>
        </span>
      </div>
      <div className="my-52">
      <p className="text-hijau md:hidden font-bold text-[20px]  mt-8 w-full text-center" >About our school</p>
      <div className="flex mx-auto flex-col md:flex-row justify-center w-4/5 lg:w-5/6 gap-10 items-center md:mt-11 ">
        <div className=" w-full sm:w-2/3 md:w-[500px]  xl:w-[540px] lg:self-start">
          <Image width={800} height={800} className="  h-auto md:h-[265px] lg:h-auto  mt-10 rounded-lg  w-full" src={Wkk} alt="" />
        </div>
        <div className=" w-full sm:w-2/3 md:w-1/2 lg:w-1/3 md:self-start">
          <article className="text-wrap w-full " >
            <p className="text-hijau font-bold xl:text-[25px] lg:text-[20px] hidden md:flex text-[15px]  mt-8" >About our school</p>
            <p className="font-bold lg:text-[35px] xl:text-[40px] lg:mt-2 md:text-[20px]">SMK WIKRAMA 1 JEPARA </p>
            <p className="text-[13px] lg:text-[15px]">SMK Wikrama 1 Jepara merupakan salah satu Lembaga Pendidikan Menengah kejuruan yang terletak di Jl.Kelet-Bangsri KM.20,Desa Kelet,Kecamatan Keling Kabupaten Jepara, Jawa Tengah.</p>
            <div className="flex lg:mt-4 mt-2">
              <Image className=" h-11 w-11" src={Warranty} alt=""  width={800} height={800} />
              <p className="mt-2">Accredited B</p>
            </div>
            <div className="bg-hijau mt-2 lg:mt-4 lg:w-40 w-32 rounded-lg text-center align-middle hover:bg-blue-500 duration-500 ">
              <Link className="text-white font-bold lg:p-4 p-2 text-[14px]  inline-block " href={"/profil"}>READ MORE</Link>
            </div>
          </article>
        </div>
      </div>
      </div>
      <div className=" my-24 py-12 bg-hijau w-full h-300 ">
        <p className="font-bold inline-block text-white text-center text-[30px] mt-5 w-full">Program Belajar</p>
        <div className="  flex flex-col xl:w-3/5 w-4/5 mx-auto gap-10 justify-around  items-center ">
          <div className="flex my-10 w-full mx-auto gap-10 justify-center">
            <article className="hidden md:flex w-1/2 h-1/2 mt-[25px] text-wrap-n text-center">
              <p className="text-white leading-8 font-light text-[14px] lg:text-[15px] ">Kurikulum Merdeka adalah kurikulum dengan pembelajaran intrakurikuler yang beragam di mana konten akan lebih optimal agar peserta didik memiliki cukup waktu untuk mendalami konsep dan menguatkan kompetensi. Guru memiliki keleluasaan untuk memilih berbagai perangkat ajar sehingga pembelajaran dapat disesuaikan dengan kebutuhan
                belajar dan minat peserta didik.</p>
            </article>
            <div className="md:w-1/2 sm:w-10/12 h-full flex flex-col items-center text-center">
              <p className="text-white mb-3 font-light text-[16px]">Kurikulum Merdeka</p>
              <Image className="w-full md:max-w-96 max-w-[400px] md:w-96 h-72 overflow-hidden  rounded-lg " src={Tjkt} alt=""  width={800} height={800}/>
            </div>
          </div>
          <div className="flex my-10 w-full mx-auto gap-10 justify-center">
            <div className="md:w-1/2 sm:w-10/12 h-full flex flex-col items-center text-center">
              <p className="text-white mb-3 font-light text-[16px]">Teaching factory</p>
              <Image className="w-full md:max-w-96 max-w-[400px] md:w-96 h-72 overflow-hidden  rounded-lg " src={A} alt="" width={800} height={800} />
            </div>
            <article className="hidden md:flex w-1/2 h-1/2 mt-[25px] text-wrap-n text-center ">
              <p className="text-white leading-8 font-light text-[14px] lg:text-[15px]">Metode TEFA merupakan gabungan dari dua metode pembelajaran, yaitu CBT (Competency Based Training) dan PBT (Production Based Training). CBT merupakan proses pelatihan yang bertujuan untuk mengembangkan kompetensi yang diperlukan oleh peserta didik, sementara PBT adalah proses pembelajaran
                keterampilan yang dilakukan berdasarkan prosedur dan standar kerja yang sesungguhnya.</p>
            </article>
          </div>
        </div>
      </div>
      <div>
        <article className=" text-nowrap mt-10 w-4/5 flex mx-auto flex-col">
          <p className="text-[#00978F] font-bold ">WHY CHOOSE US</p>
          <p className="font-extrabold text-[14px] md:text-[32px]">Mengapa memiliih SMK WIKRAMA 1 JEPARA?</p>
        </article>
        <div className=" md:mt-10 flex w-4/5 mx-auto mt-4 gap-30 justify-center flex-col lg:flex-row flex-wrap items-center gap-10">
          <div className="md:w-96 md:h-96 h-80 w-80 shadow-lg inset-shadow-xs rounded-lg  flex justify-center  flex-col items-center">
            <Image width={800} height={800} className="w-20 h-1w-20 mt-4" src={Laptop} alt="" />
            <article className="w-5/6 h-50 mt-4  text-wrap text-center">
              <p className="leading-5">Sekolah kejurusan yang berfokus dalam perkembangan dunia teknologi  yang sejajar dengan perkembagan zaman</p>
            </article>
          </div>
          <div className="md:w-96 md:h-96 h-80 w-80 shadow-lg inset-shadow-xs rounded-lg  flex justify-center  flex-col items-center">
            <Image width={800} height={800} className="w-20 h-1w-20 mt-4 " src={Graduation} alt="" />
            <article className="w-5/6 h-50 mt-4  text-wrap text-center">
              <p className="leading-5">Sekolah kejurusan yang mengamalkan nilai sosial , nilai moral dan mengamalkan pancasila dalam kehidupan sehari hari</p>
            </article>
          </div>
          <div className="md:w-96 md:h-96 h-80 w-80 mt-20 shadow-lg inset-shadow-xs rounded-lg  flex justify-center  flex-col items-center">
            <Image width={800} height={800} className="w-20 h-1w-20 mt-4" src={Factory} alt="" />
            <article className="w-5/6 h-50 mt-4  text-wrap text-center">
              <p className="leading-5">sekolah yang memiliki model pembelajaran berbasis industri yang menggabungkan teori dan praktik di lingkungan kerja yang sebenarnya, bertujuan untuk menghasilkan lulusan yang kompeten sesuai dengan kebutuhan dunia industri.</p>
            </article>
          </div>
          <div className="md:w-96 md:h-96 h-80 w-80 mt-20 shadow-lg inset-shadow-xs rounded-lg  flex justify-center  flex-col items-center">
            <Image width={800} height={800} className="w-20 h-1w-20 mt-4 " src={Stairs} alt="" />
            <article className="w-5/6 h-50 mt-4  text-wrap text-center">
              <p className="leading-5">Lulusan SMK Wikrama memiliki berbagai pilihan karir yang sesuai dengan keahlian yang mereka kuasai, mulai dari bekerja di perusahaan hingga menjadi wirausaha</p>
            </article>
          </div>
        </div>
      </div>
      <Berita/>
    </>
  );
}
