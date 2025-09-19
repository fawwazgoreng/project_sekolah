/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

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
import programsekwt from "@/public/programsekwt.png";
import programsekbl from "@/public/programsek.png";
import programbl from "@/public/programbl.png";
import programwt from "@/public/programwt.png";
import facilibl from "@/public/companybl.png";
import faciliwt from "@/public/companywt.png";

interface NavItemProps {
  defaultImg: StaticImageData;
  hoverImg: StaticImageData;
  label: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ defaultImg, hoverImg, label, href }) => {
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link href={href} className="w-20 h-20">
      <span
        className={`duration-500 rounded-full flex mx-auto justify-center items-center overflow-hidden w-1/2 h-1/2
          ${isActive ? 'bg-blue-200' : isHovering ? 'bg-black' : 'bg-white'}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image
          src={isActive || isHovering ? hoverImg : defaultImg}
          alt={label}
          width={32}
          height={32}
          className="w-8 h-8 object-cover object-center"
        />
      </span>
      <span className="w-20 h-10 mt-2 text-center text-wrap">
        <h1 className={`${isActive ? 'text-blue-600 font-semibold' : ''}`}>{label}</h1>
      </span>
    </Link>
  );
};

const NavBarAdmin = () => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  const ToggleNavbar = () => setIsActive(!isActive);

  return (
    <div>
      {/* Sidebar desktop */}
      <div className="w-full md:flex flex-nowrap hidden">
        <div className="h-full md:w-64 md:h-screen md:flex justify-between flex-col bg-white md:bg-hijau text-white">
          <div className=" mx-auto h-3/5 mt-4 flex flex-col items-center justify-center gap-2">
            {[
              { href: '/admin/dashboard/slide', label: 'slide' },
              { href: '/admin/dashboard/about', label: 'about' },
              { href: '/admin/dashboard/fasilitas', label: 'fasilitas' },
              { href: '/admin/dashboard/extrakulikuler', label: 'extrakulikuler' },
              { href: '/admin/dashboard/programsekolah', label: 'program sekolah' },
              { href: '/admin/dashboard/sejarah', label: 'sejarah' },
              { href: '/admin/dashboard/visimisi', label: 'visi misi' },
              { href: '/admin/dashboard/berita', label: 'berita' },
              { href: '/admin/dashboard/prestasi', label: 'prestasi' },
              { href: '/admin/dashboard/mading', label: 'mading' },
            ].map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full rounded-md duration-200 h-20 text-2xl font-semibold capitalize flex items-center
                    ${active ? 'bg-blue-600 text-white' : 'hover:bg-blue-500'}`}
                >
                  <p className="ml-[10%] capitalize">{item.label}</p>
                </Link>
              );
            })}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin' })}
            className="mb-7 text-xl text-center items-center justify-center text-white bg-red-600 rounded-md w-28 font-bold flex mx-auto px-3 py-2"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden mt-3 w-11/12 mx-auto">
        <div
          className={isActive ? "menu menuActive" : "menu"}
          onClick={ToggleNavbar}
        >
          <button className="opacity-0 z-50 w-10 h-10 absolute lg:hidden"></button>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div
          className={
            isActive
              ? 'w-11/12 flex h-80 sm:h-52 flex-col mx-auto pt-5 overflow-y-hidden duration-500'
              : 'duration-500 overflow-y-hidden h-0 w-11/12 mx-auto'
          }
        >
          <div
            className={
              isActive
                ? 'w-11/12 sm:w-5/6 mx-auto flex justify-center gap-2 flex-wrap duration-500'
                : 'opacity-0 w-full h-0'
            }
          >
            <NavItem defaultImg={slidebl} hoverImg={slidewt} label="Slide" href="/admin/dashboard/slide" />
            <NavItem defaultImg={aboutbl} hoverImg={aboutwt} label="About" href="/admin/dashboard/about" />
            <NavItem defaultImg={facilibl} hoverImg={faciliwt} label="Fasilitas" href="/admin/dashboard/fasilitas" />
            <NavItem defaultImg={programbl} hoverImg={programwt} label="extrakulikuler" href="/admin/dashboard/extrakulikuler" />
            <NavItem defaultImg={programsekbl} hoverImg={programsekwt} label="Program sekolah" href="/admin/dashboard/programsekolah" />
            <NavItem defaultImg={hitorybl} hoverImg={hitorywt} label="Sejarah" href="/admin/dashboard/sejarah" />
            <NavItem defaultImg={visibl} hoverImg={visiwt} label="Visi Misi" href="/admin/dashboard/visimisi" />
            <NavItem defaultImg={newsbl} hoverImg={newswt} label="Berita" href="/admin/dashboard/berita" />
            <NavItem defaultImg={achibl} hoverImg={achiwt} label="Prestasi" href="/admin/dashboard/prestasi" />
            <NavItem defaultImg={madingbl} hoverImg={madingwt} label="Mading" href="/admin/dashboard/mading" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarAdmin;
