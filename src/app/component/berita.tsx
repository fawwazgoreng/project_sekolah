"use client"
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import "../berita.css";
import { CSSProperties } from "react";
import { ChevronRight, ChevronLeft} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BeritaGet } from "../api/berita";
import Link from "next/link";
import { DataAbout } from "../types/types";

export default function Berita() {
    const [mounted, setMounted] = useState(false);
    const [beritaGet, setBeritaGet] = useState<DataAbout[]>([]);
    const [initialSlide, setInitialSlide] = useState(0);
    console.log(beritaGet);
    useEffect(() => {
        setMounted(true);
        BeritaGet().then((res) => setBeritaGet(res.data)).catch((err) => console.log(err))
        if (window.innerWidth < 640) {
            setInitialSlide(1);
        } else if (window.innerWidth < 1024) {
            setInitialSlide(2);
        } else if (window.innerWidth > 1024 || window.innerWidth > 1280 || window.innerWidth > 1568) {
            setInitialSlide(3);
        }
    }, []);
    console.log(beritaGet)
    if (!mounted) return null;
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: initialSlide,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640, // mobile
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        slidesToScroll: 1,
        cssEase: "ease-in-out",
        nextArrow: <CustomArrow direction="right" />,
        prevArrow: <CustomArrow direction="left" />,
    };
    return (
        <div className="w-full container flex items-center justify-center mx-auto">
            <Slider {...settings} className="lg:w-11/12 w-11/12 flex mx-auto self-center justify-around overflow-hidden mt-40 berita-slick">
                {beritaGet.map((res) => (
                    <Link href={`/berita/${res.id}`} key={res.id} className="w-full h-[470px] group rounded-sm bg-white shadow-lg overflow-hidden flex flex-col flex-wrap">
                        <Image className="w-full h-56 relative object-cover object-center " src={`${res.gambar}`} alt={res.gambar} width={2000} height={2000}></Image>
                        <span className="mt-4 w-11/12 flex flex-col mx-auto">
                            <p className="font-extralight text-[17px]">Berita</p>
                            <h2 className="text-ellipsis overflow-clip text-nowrap text-[20px] font-extrabold h-8 ">{res.judul}</h2>
                            <p className="h-[110px] mt-1 group-hover:text-blue-500 duration-300 text-[18px] overflow-hidden text-ellipsis">{res.deskripsi}</p>
                            <p className="mt-3 text-[18px] overflow-hidden h-7 text-ellipsis font-bold">{res.created_at?.split('T')[0]}</p>
                        </span>
                    </Link>
                ))}
            </Slider>
        </div>
    );
}

type ArrowProps = {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
    direction: "left" | "right";
};

const CustomArrow: React.FC<ArrowProps> = ({
    onClick,
    direction,
}) => {
    return (
        <div
            className={`
        absolute lg:top-1/2 top-80 z-40 p-1.5 lg:p-2 lg:-translate-y-10 -translate-y-20 cursor-pointer items-center justify-center
        rounded-full bg-white shadow-md transition hover:scale-110 hover:bg-gray-100
        ${direction === "left" ? "left-3 " : "right-3"}
      `}
            onClick={onClick}
        >
            {direction === "left" ? (
                <ChevronLeft className="h-6 w-6 flex mx-auto mt-1 text-gray-800" />
            ) : (
                <ChevronRight className="h-6 w-6 flex mx-auto mt-1 text-gray-800" />
            )}
        </div>
    );
};