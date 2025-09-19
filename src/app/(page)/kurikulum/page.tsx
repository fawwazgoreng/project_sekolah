import { Card } from "@/app/component/card"
import { CardTop } from "@/app/component/CardSecond"

export default function Kurikulum() {
    return (
        <>
            <Card Arrow={false} />
            <CardTop title="Kurikulum mengacu pada Kurikulum Merdeka atau K13 Revisi, dengan penekanan pada keterampilan teknis (hard skills) dan kecakapan kerja (soft skills). Terdiri dari:" />
            <div className="w-200 h-320 sm:ml-20 ml-10  mt-40 ">
                <p className="text-[#00978F] font-bold text-[18px] md:text-[24px]">Mata Pelajaran</p>
                <div>
                    <p className="md:text-[20px] text-[15px] font-bold mt-[5px]">Umum :</p>
                    <ul className="list-inside list-disc mt-[5px] text-[12px] md:text-[15px]">
                        <li>Pendidikan Kewarganegaraan</li>
                        <li>Bahasa Indonesia</li>
                        <li>Bahasa Arab</li>
                        <li>Bahasa Inggris</li>
                        <li>Matematika</li>
                        <li>Ilmu Pengetahuan Alam (IPA)</li>
                        <li>Ilmu Pengetahuan Sosial (IPS)</li>
                        <li>Seni Budaya</li>
                        <li>Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</li>
                        <li>Prakarya atau Informatika</li>
                    </ul>
                </div>
                <div>
                    <p className="md:text-[20px] text-[15px] font-bold mt-[5px]">Keagamman :</p>
                    <ul className="list-inside list-disc mt-[5px] text-[12px] md:text-[15px]">
                        <li>Al-Qur&apos;an Hadis</li>
                        <li>Akidah Akhlak</li><li>Fikih</li>
                        <li>Sejarah Kebudayaan Islam (SKI)</li>
                    </ul>
                </div>
                {/* <p className="text-[#00978F] font-bold text-[18px] md:text-[24px] mt-[15px]">2. Mata Pelajaran Kejuruan (Produktif)</p>
                <div className="mt-[10px]">
                    <p className="md:text-[20px] text-[15px] font-bold mt-[5px]">A. Jurusan Rekayasa Perangkat Lunak (RPL)</p>
                    <ul className="ml-4 list-outside list-disc  w-75 m text-[12px] md:text-[15px]l-4 mt-[5px]">
                    <li>Dasar Pemrograman: Python, Java atau JavaScript.</li>
                    <li className="w-100 ">Pengembangan Web: HTML, CSS, PHP, Framework (Laravel/React).</li>
                    <li>Basis Data: MySQL, PostgreSQL.</li>
                    <li className="w-90">Mobile Development: Android Studio (Kotlin/Java), Flutter.</li>
                    <li>UI/UX Design: Figma, Adobe XD.</li>
                    <li className="w-90">Proyek Sistem Informasi: Pembuatan aplikasi untuk UMKM/sekolah.</li>
                </ul>
                </div>
                <div>
                    <p className=" md:text-[20px] text-[15px] font-bold mt-[5px]">B. Jurusan Teknik Komputer dan Jaringan (TKJ):</p>
                    <ul className="ml-4 list-outside list-disc  w-75 ml text-[12px] md:text-[15px]-4 mt-[5px]">
                        <li className="w-90">Jaringan Dasar: Konfigurasi LAN, WAN, VLAN.</li>
                        <li className="w-98">Administrasi Server: Linux (Ubuntu Server), Windows Server.</li>
                        <li className="w-90">Keamanan Jaringan: Firewall, VPN, Ethical Hacking dasar.</li>
                        <li>Pemeliharaan Hardware: Perakitan PC, troubleshooting.</li>
                        <li className="w-90">Cloud Computing: Pengenalan AWS/Google Cloud.</li>
                        <li className="w-95">Proyek Jaringan: Instalasi jaringan untuk lingkungan sekolah.</li>
                </ul>
                <div className="mt-[10px]">
                    <p className="text-[#00978F] font-bold text-[18px] md:text-[24px] mt-[15px]">3. Praktik Kerja Lapangan (PKL)</p>
                    <ul className="list-outside list-disc  w-75 ml-4 mt-[5px]">
                    <li className="w-86">Dilakukan di tahun ke-3 selama 3-6 bulan di perusahaan IT, ISP, atau instansi terkait.</li>
                </ul>
                </div>
                    <p className="text-[#00978F] font-bold text-[18px] md:text-[24px] mt-[15px]">4. Teaching Factory (TEFA)</p>
                <div className="mt-[10px]">
                    <p className=" md:text-[20px] text-[15px] font-bold mt-[5px]">Siswa mengerjakan proyek nyata untuk mitra industri, seperti:</p>
                <ul className="list-inside list-disc mt-[5px]">
                    <li >Pembuatan website/aplikasi (RPL).</li>
                    <li >Perancangan jaringan komputer (TKJ).</li>
                </ul>
                </div>
                </div> */}
            </div>
        </>
    )
}