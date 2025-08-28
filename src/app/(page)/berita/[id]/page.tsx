"use client"
import { use } from 'react';
import Image from 'next/image';
import Wkk from "@/public/wkk.jpeg";
import Link from 'next/link';

export default function BeritaDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <>
            <div className='mt-5 w-11/12 flex lg:flex-row flex-col mx-auto justify-between'>
                <div className=' lg:w-[70%] w-full flex flex-col gap-5'>
                    <h1 className='text-[25px] font-extrabold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus recusandae officia sed accusamus, possimus architecto reprehenderit vel rem debitis quam.</h1>
                    <p>20/20/02</p>
                    <Image className='w-full h-auto max-h-[450px] object-cover object-center' src={Wkk} alt='' width={1000} height={1000} ></Image>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit at dolorum, molestiae dicta consequuntur quibusdam dolores ratione. Reprehenderit earum amet nam ab ipsa illo optio aliquid sunt sequi, consequatur quis error placeat esse labore unde aspernatur adipisci quo maiores recusandae? Labore nostrum, id commodi ut dolore aspernatur voluptatibus, explicabo placeat quod incidunt sapiente cum velit nisi impedit pariatur minus sint illo soluta, dolorem eaque? Aliquam nemo a deserunt, recusandae obcaecati sunt velit quasi consequuntur sed sit iure harum animi iusto expedita reprehenderit et ipsam quam fugit sint earum? Pariatur, iste corrupti. Alias excepturi iure cum nostrum dicta exercitationem ipsa quidem!</p>
                </div>
                <div className='lg:w-[27%] w-full flex flex-col mt-10 gap-4  flex-nowrap'>
                    <h1 className=' text-xl font-extrabold '><span className=' decoration-hijau underline-offset-4 underline decoration-4'>Berita</span> lainya</h1>
                    <span className='w-full flex mt-4 gap-y-10 gap-x-4 lg:gap-y-4 flex-wrap lg:flex-col lg:justify-normal justify-center'>
                        <Link href={"/berita/"} className='lg:w-full w-[40%]  md:w-[30%] flex lg:flex-row flex-col h-64 lg:h-32 lg:gap-0 gap-2 justify-between '>
                            <span className='w-full lg:w-[50%] h-32 overflow-hidden rounded-md'>
                                <Image className='w-full h-32 object-cover object-center hover:scale-125 duration-300' src={Wkk} alt=''></Image>
                            </span>
                            <p className='lg:w-[45%] w-full h-32 text-wrap text-[17px] overflow-hidden duration-200 text-ellipsis hover:text-blue-600'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quos saepe deleniti mollitia! Dolorum doloribus ipsam, asperiores sit deleniti numquam itaque modi ullam.</p>
                        </Link>
                    </span>
                </div>
            </div>
        </>
    )
}