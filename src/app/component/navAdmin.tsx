'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import Account from '@/public/account.png';
import AccountWt from '@/public/adminwt.png';
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
  return (
    <div>
      <div className="w-full md:flex flex-nowrap hidden">
        <div className="w-48 h-full fixed md:flex flex-col bg-hijau text-white">
          <div className="justify-between items-center mt-4 w-4/5 flex mx-auto bg-white rounded-md">
            <span className="w-1/3">
              <Image className="w-11 h-11" src={Account} alt="Admin Icon" width={800} height={800} />
            </span>
            <h1 className="w-2/3 text-black font-semibold text-md">Admin</h1>
          </div>
          <div className="w-full h-1/2 mt-4 flex flex-col items-center">
            {['slide', 'about', 'sejarah', 'visi misi', 'berita', 'prestasi', 'kesiswaan', 'admin'].map((label) => (
              <Link href={`/admin/dashboard/${label}`}
                key={label}
                className="w-full rounded-md hover:bg-blue-500 duration-200 h-10 text-2xl font-semibold capitalize flex"
              >
                <p className='ml-[10%]'>
                {label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="w-11/12 sm:w-4/6 flex mx-auto pt-5">
        <div className="w-full md:hidden flex justify-center gap-4 flex-wrap">
          <NavItem defaultImg={slidebl} hoverImg={slidewt} label="Slide" href='/admin/dashboard' />
          <NavItem defaultImg={aboutbl} hoverImg={aboutwt} label="About" href='/admin/dashboard/about' />
          <NavItem defaultImg={hitorybl} hoverImg={hitorywt} label="Sejarah" href='/admin/dashboard/sejarah' />
          <NavItem defaultImg={visibl} hoverImg={visiwt} label="Visi Misi" href='/admin/visimisi' />
          <NavItem defaultImg={newsbl} hoverImg={newswt} label="Berita" href='/admin/dashboard/berita' />
          <NavItem defaultImg={achibl} hoverImg={achiwt} label="Prestasi" href='/admin/dashboard/prestasi' />
          <NavItem defaultImg={madingbl} hoverImg={madingwt} label="Mading" href='/admin/dashboard/mading' />
          <NavItem defaultImg={AccountBl} hoverImg={AccountWt} label="Admin" href='/admin/dashboard/admin' />
        </div>
      </div>
    </div >
  );
};

export default NavBarAdmin;
