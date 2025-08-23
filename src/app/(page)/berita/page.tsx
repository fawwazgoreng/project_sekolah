import Image from "next/image";
import Wkk from "@/public/wkk.jpeg";
import Link from "next/link";

export default function BeritaNews() {
    return (
        <>
            <div className="w-full container flex items-center justify-center mx-auto">
                <div className="lg:w-11/12 w-11/12 flex mx-auto flex-wrap self-center justify-center overflow-hidden gap-4 mt-20 berita-slick">
                    <Link href={`/berita/`} className="group w-full sm:w-[40%] lg:w-[30%] xl:w-[24%] h-[470px] rounded-sm bg-white shadow-lg inset-shadow-xs overflow-hidden flex flex-col flex-wrap">
                        <Image className=" w-full max-h-56 relative object-cover object-center " src={Wkk} alt="" width={2000} height={2000}></Image>
                        <span className="mt-4 w-11/12 flex flex-col mx-auto">
                            <p className="font-extralight text-[17px]">Berita</p>
                            <h2 className="text-ellipsis overflow-clip text-nowrap text-[20px] font-extrabold h-8 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed velit nemo consectetur facere impedit enim at quisquam eius eum assumenda.</h2>
                            <p className="h-[110px] mt-1 text-[18px] overflow-hidden text-ellipsis group-hover:text-blue-400 duration-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sint perferendis vitae corporis quia voluptatibus! Atque iure quam perspiciatis voluptas officiis sed animi praesentium nulla esse ex molestiae, minus laboriosam porro quos voluptatum? Doloremque deleniti laboriosam sunt labore eum dolor, numquam laudantium, iste esse quisquam praesentium totam? Doloremque similique sapiente et! Aliquam, accusamus et! Animi, dolorum assumenda sint veniam molestiae enim. Fuga nihil minima ipsam facilis sit ab perspiciatis placeat rem at voluptatem fugit ut explicabo dolor iusto inventore dolores quaerat necessitatibus sunt quos, molestias perferendis animi. Tempora explicabo sint eaque, blanditiis quod quo eius modi iure, iste praesentium dolore!</p>
                            <p className="mt-3 text-[18px] overflow-hidden h-7 text-ellipsis font-bold">20/20/20</p>
                        </span>
                    </Link>
                </div>
            </div>
        </>
    )
}