'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AccountWt from '@/public/adminwt.png';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AccountBl from '@/public/adminbl.png';
import slidewt from '@/public/slidewt.png';
import slidebl from '@/public/slidebl.png';
import aboutwt from '@/public/aboutwt.png';
import aboutbl from '@/public/aboutbl.png';
import hitorybl from '@/public/hitorybl.png';
import hitorywt from '@/public/hitorywt.png';
import visibl from '@/public/visibl.png';
import visiwt from '@/public/visiwt.png';
import newsbl from '@/public/Newsbl.png';
import newswt from '@/public/Newswt.png';
import achibl from '@/public/achibl.png';
import achiwt from '@/public/achiwt.png';
import madingbl from '@/public/madingbl.png';
import madingwt from '@/public/madingwt.png';

interface NavItemProps {
  defaultImg: StaticImageData;
  hoverImg: StaticImageData;
  label: string;
  href?: string;
}

const NavItem: React.FC<NavItemProps> = ({ defaultImg, hoverImg, label, href = '' }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Link
      href={href}
      className="w-20 h-20"
    >
      <span className="hover:bg-black duration-500 bg-white rounded-full flex mx-auto justify-center items-center overflow-hidden w-1/2 h-1/2"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        <Image
          src={isHovering ? hoverImg : defaultImg}
          alt={label}
          width={32}
          height={32}
          className="w-8 h-8 object-cover object-center"
        />
      </span>
      <span className="w-20 h-10 mt-2 text-center text-wrap">
        <h1>{label}</h1>
      </span>
    </Link>
  );
};

const NavBarAdmin = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <div className="w-full md:flex flex-nowrap hidden">
        <div className=" h-full md:w-64 md:h-screen md:flex justify-between flex-col bg-white md:bg-hijau text-white">
          <div className="w-11/12 mx-auto h-3/5 mt-4 flex flex-col items-center justify-center gap-2">
            <Link href={`/admin/dashboard/`}
              className="w-full rounded-md hover:bg-blue-500 duration-200 h-20 text-2xl font-semibold capitalize flex items-center"
            >
              <p className='ml-[10%] capitalize'>
                slide
              </p>
            </Link>
            <Link href={`/admin/dashboard/fasilitas`}
              className="w-full rounded-md hover:bg-blue-500 duration-200 h-20 text-2xl font-semibold capitalize flex items-center"
            >
              <p className='ml-[10%] capitalize'>
                fasilitas
              </p>
            </Link>
            <Link href={`/admin/dashboard/program`}
              className="w-full rounded-md hover:bg-blue-500 duration-200 h-20 text-2xl font-semibold capitalize flex items-center"
            >
              <p className='ml-[10%] capitalize'>
                program
              </p>
            </Link>
            <Link href={`/admin/dashboard/programsekolah`}
              className="w-full rounded-md hover:bg-blue-500 duration-200 h-20 text-2xl font-semibold capitalize flex items-center"
            >
              <p className='ml-[10%] capitalize'>
                program sekolah
              </p>
            </Link>
            <Link href={`/admin/dashboard/sejarah`}
              className="w-full rounded-md hover:bg-blue-500 duration-200 h-20 text-2xl font-semibold capitalize flex items-center"
            >
              <p className='ml-[10%] capitalize'>
                sejarah
              </p>
            </Link>
            <Link href={`/admin/dashboard/visimisi`}
              className="w-full rounded-md hover:bg-blue-500 duration-200 h-20 text-2xl font-semibold capitalize flex items-center"
            >
              <p className='ml-[10%] capitalize'>
                visi misi
              </p>
            </Link>
            <Link href={`/admin/dashboard/berita`}
              className="w-full rounded-md hover:bg-blue-500 duration-200 h-20 text-2xl font-semibold capitalize flex items-center"
            >
              <p className='ml-[10%] capitalize'>
                berita
              </p>
            </Link>
            <Link href={`/admin/dashboard/prestasi`}
              className="w-full rounded-md hover:bg-blue-500 duration-200 h-20 text-2xl font-semibold capitalize flex items-center"
            >
              <p className='ml-[10%] capitalize'>
                prestasi
              </p>
            </Link>
            <Link href={`/admin/dashboard/mading`}
              className="w-full rounded-md hover:bg-blue-500 duration-200 h-20 text-2xl font-semibold capitalize flex items-center"
            >
              <p className='ml-[10%] capitalize'>
                mading
              </p>
            </Link>
            {/* <Link href={`/admin/dashboard/admin`}
              className="w-full rounded-md hover:bg-blue-500 duration-200 h-20 text-2xl font-semibold capitalize flex items-center"
            >
              <p className='ml-[10%] capitalize'>
                admin
              </p>
            </Link> */}
          </div>
          <button onClick={() => signOut({callbackUrl: "/admin"})} className='mb-7 text-xl text-center items-center justify-center text-white bg-red-600 rounded-md w-28 font-bold flex mx-auto px-3 py-2'>Log out</button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className={isActive ? "w-11/12 flex flex-col mx-auto pt-5 overflow-y-hidden md:hidden" : "md:hidden overflow-y-hidden w-11/12 flex flex-col mx-auto pt-5"}>
        <div className={isActive ? "menu menuActive" : "menu"}>
          <button className=" opacity-0 z-50 w-20 h-20 absolute right-4  lg:hidden bg-black " onClick={() => setIsActive(!isActive)}></button>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={isActive ? "w-11/12 sm:w-5/6 h-64 sm:h-40 mx-auto md:hidden flex justify-center gap-2 flex-wrap duration-500" : "mx-auto md:hidden flex justify-center gap-2 flex-wrap duration-500 opacity-0 w-full h-0"}>
          <NavItem defaultImg={slidebl} hoverImg={slidewt} label="Slide" href='/admin/dashboard' />
          <NavItem defaultImg={aboutbl} hoverImg={aboutwt} label="Fasilitas" href='/admin/dashboard/fasilitas' />
          <NavItem defaultImg={aboutbl} hoverImg={aboutwt} label="Program" href='/admin/dashboard/program' />
          <NavItem defaultImg={aboutbl} hoverImg={aboutwt} label="Program sekolah" href='/admin/dashboard/programsekolah' />
          <NavItem defaultImg={hitorybl} hoverImg={hitorywt} label="Sejarah" href='/admin/dashboard/sejarah' />
          <NavItem defaultImg={visibl} hoverImg={visiwt} label="Visi Misi" href='/admin/dashboard/visimisi' />
          <NavItem defaultImg={newsbl} hoverImg={newswt} label="Berita" href='/admin/dashboard/berita' />
          <NavItem defaultImg={achibl} hoverImg={achiwt} label="Prestasi" href='/admin/dashboard/prestasi' />
          <NavItem defaultImg={madingbl} hoverImg={madingwt} label="Mading" href='/admin/dashboard/mading' />
          {/* <NavItem defaultImg={AccountBl} hoverImg={AccountWt} label="Admin" href='/admin/dashboard/admin' /> */}
        </div>
      </div>
    </div >
  );
};

export default NavBarAdmin;
