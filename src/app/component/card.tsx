"use client"
// import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CSSProperties } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { SlideGet } from "../api/slide";

// const Szlider = dynamic(() => import("react-slick"), {
//   ssr: false, // disable SSR untuk komponen ini
// });


    type DataItem = {
  id: number;
  gambar: string;
  created_at: string | null;
  updated_at: string | null;
};


interface Props {
    Arrow: boolean;
}

export const Card: React.FC<Props> = ({ Arrow }) => {
     const [data, setDataitem] = useState<DataItem[]>([]);

  useEffect(() => {
    SlideGet()
      .then((res) => setDataitem(res.data))
      .catch((err) => console.log(err));
  }, []);
    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "ease-in-out",
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: false,
        pauseOnFocus: false,
        pauseOnDotsHover: false,
        nextArrow: <CustomArrow direction="right" Arrow={Arrow} />,
        prevArrow: <CustomArrow direction="left" Arrow={Arrow} />,
    };

    return (
        <>
            <Slider {...settings} className="w-full overflow-hidden">
                <div className="w-full lg:h-[550px] h-64 sm:h-96 overflow-hidden"></div>
                {data.map((res, loop) => {
                    return (
                        <div key={loop + 1} className="w-full lg:h-[550px] h-64 sm:h-96 overflow-hidden">
                        <div className="w-full lg:h-[550px] h-64 sm:h-96 overflow-hidden bg-black absolute z-10 opacity-10"></div>
                        <Image className="w-full h-full  infiniteScales relative object-cover object-center " src={`${process.env.NEXT_PUBLIC_BASEURL}/${res.gambar}`} alt={`${res.gambar}`} width={2000} height={2000}></Image>
                    </div>
                    )
})}
            </Slider>
        </>
    );
}

type ArrowProps = {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
    direction: "left" | "right";
    Arrow: boolean;
};

const CustomArrow: React.FC<ArrowProps> = ({
    onClick,
    direction,
    Arrow,
}) => {
    return (
        <div
            className={`
        absolute hidden lg:top-1/2 sm:top-64 z-10 sm:flex p-1.5 lg:p-2 lg:-translate-y-28 -translate-y-20 cursor-pointer items-center justify-center
        rounded-full bg-white shadow-md transition hover:scale-110 hover:bg-gray-100
        ${direction === "left" ? "lg:left-24 left-2 " : "lg:right-24 right-2"} ${Arrow === true ? "" : "hidden sm:hidden md:hidden lg:hidden xl:hidden"}
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