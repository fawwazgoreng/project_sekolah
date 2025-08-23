"use client"
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import "../berita.css";
import { CSSProperties } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Wkk from "@/public/wkk.jpeg";
import { useState, useEffect } from "react";

export default function Berita() {
    const [mounted, setMounted] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);
    useEffect(() => {
        setMounted(true);
        if (window.innerWidth < 640) {
            setInitialSlide(1);
        } else if (window.innerWidth < 1024) {
            setInitialSlide(2);
        } else if (window.innerWidth > 1024 || window.innerWidth > 1280 || window.innerWidth > 1568) {
            setInitialSlide(3);
        }
    }, []);
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
                <div className="w-full h-[470px] rounded-sm bg-white shadow-lg overflow-hidden flex flex-col flex-wrap">
                    <Image className=" w-full h-56 relat
                    ive object-cover object-center " src={Wkk} alt="" width={2000} height={2000}></Image>
                    <span className="mt-4 w-11/12 flex flex-col mx-auto">
                        <p className="font-extralight text-[17px]">Berita</p>
                        <h2 className="text-ellipsis overflow-clip text-nowrap text-[20px] font-extrabold h-8 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed velit nemo consectetur facere impedit enim at quisquam eius eum assumenda.</h2>
                        <p className="h-[110px] mt-1 text-[18px] overflow-hidden text-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sint perferendis vitae corporis quia voluptatibus! Atque iure quam perspiciatis voluptas officiis sed animi praesentium nulla esse ex molestiae, minus laboriosam porro quos voluptatum? Doloremque deleniti laboriosam sunt labore eum dolor, numquam laudantium, iste esse quisquam praesentium totam? Doloremque similique sapiente et! Aliquam, accusamus et! Animi, dolorum assumenda sint veniam molestiae enim. Fuga nihil minima ipsam facilis sit ab perspiciatis placeat rem at voluptatem fugit ut explicabo dolor iusto inventore dolores quaerat necessitatibus sunt quos, molestias perferendis animi. Tempora explicabo sint eaque, blanditiis quod quo eius modi iure, iste praesentium dolore!</p>
                        <p className="mt-3 text-[18px] overflow-hidden h-7 text-ellipsis font-bold">20/20/20</p>
                    </span>
                </div>
                <div className="w-full h-[470px] rounded-sm bg-white shadow-lg overflow-hidden flex flex-col flex-wrap">
                    <Image className="w-full h-56 relative object-cover object-center " src={Wkk} alt="" width={2000} height={2000}></Image>
                    <span className="mt-4 w-11/12 flex flex-col mx-auto">
                        <p className="font-extralight text-[17px]">Berita</p>
                        <h2 className="text-ellipsis overflow-clip text-nowrap text-[20px] font-extrabold h-8 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed velit nemo consectetur facere impedit enim at quisquam eius eum assumenda.</h2>
                        <p className="h-[110px] mt-1 text-[18px] overflow-hidden text-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sint perferendis vitae corporis quia voluptatibus! Atque iure quam perspiciatis voluptas officiis sed animi praesentium nulla esse ex molestiae, minus laboriosam porro quos voluptatum? Doloremque deleniti laboriosam sunt labore eum dolor, numquam laudantium, iste esse quisquam praesentium totam? Doloremque similique sapiente et! Aliquam, accusamus et! Animi, dolorum assumenda sint veniam molestiae enim. Fuga nihil minima ipsam facilis sit ab perspiciatis placeat rem at voluptatem fugit ut explicabo dolor iusto inventore dolores quaerat necessitatibus sunt quos, molestias perferendis animi. Tempora explicabo sint eaque, blanditiis quod quo eius modi iure, iste praesentium dolore!</p>
                        <p className="mt-3 text-[18px] overflow-hidden h-7 text-ellipsis font-bold">20/20/20</p>
                    </span>
                </div>
                <div className="w-full h-[470px] rounded-sm bg-white shadow-lg  overflow-hidden flex flex-col flex-wrap">
                    <Image className="w-full h-56 relative object-cover object-center " src={Wkk} alt="" width={2000} height={2000}></Image>
                    <span className="mt-4 w-11/12 flex flex-col mx-auto">
                        <p className="font-extralight text-[17px]">Berita</p>
                        <h2 className="text-ellipsis overflow-clip text-nowrap text-[20px] font-extrabold h-8 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed velit nemo consectetur facere impedit enim at quisquam eius eum assumenda.</h2>
                        <p className="h-[110px] mt-1 text-[18px] overflow-hidden text-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sint perferendis vitae corporis quia voluptatibus! Atque iure quam perspiciatis voluptas officiis sed animi praesentium nulla esse ex molestiae, minus laboriosam porro quos voluptatum? Doloremque deleniti laboriosam sunt labore eum dolor, numquam laudantium, iste esse quisquam praesentium totam? Doloremque similique sapiente et! Aliquam, accusamus et! Animi, dolorum assumenda sint veniam molestiae enim. Fuga nihil minima ipsam facilis sit ab perspiciatis placeat rem at voluptatem fugit ut explicabo dolor iusto inventore dolores quaerat necessitatibus sunt quos, molestias perferendis animi. Tempora explicabo sint eaque, blanditiis quod quo eius modi iure, iste praesentium dolore!</p>
                        <p className="mt-3 text-[18px] overflow-hidden h-7 text-ellipsis font-bold">20/20/20</p>
                    </span>
                </div>
                <div className="w-full h-[470px] rounded-sm bg-white shadow-lg overflow-hidden flex flex-col flex-wrap">
                    <Image className="w-full h-56 relative object-cover object-center " src={Wkk} alt="" width={2000} height={2000}></Image>
                    <span className="mt-4 w-11/12 flex flex-col mx-auto">
                        <p className="font-extralight text-[17px]">Berita</p>
                        <h2 className="text-ellipsis overflow-clip text-nowrap text-[20px] font-extrabold h-8 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed velit nemo consectetur facere impedit enim at quisquam eius eum assumenda.</h2>
                        <p className="h-[110px] mt-1 text-[18px] overflow-hidden text-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sint perferendis vitae corporis quia voluptatibus! Atque iure quam perspiciatis voluptas officiis sed animi praesentium nulla esse ex molestiae, minus laboriosam porro quos voluptatum? Doloremque deleniti laboriosam sunt labore eum dolor, numquam laudantium, iste esse quisquam praesentium totam? Doloremque similique sapiente et! Aliquam, accusamus et! Animi, dolorum assumenda sint veniam molestiae enim. Fuga nihil minima ipsam facilis sit ab perspiciatis placeat rem at voluptatem fugit ut explicabo dolor iusto inventore dolores quaerat necessitatibus sunt quos, molestias perferendis animi. Tempora explicabo sint eaque, blanditiis quod quo eius modi iure, iste praesentium dolore!</p>
                        <p className="mt-3 text-[18px] overflow-hidden h-7 text-ellipsis font-bold">20/20/20</p>
                    </span>
                </div>
                <div className="w-full h-[470px] rounded-sm bg-white shadow-lg  overflow-hidden flex flex-col flex-wrap">
                    <Image className="w-full h-56 relative object-cover object-center " src={Wkk} alt="" width={2000} height={2000}></Image>
                    <span className="mt-4 w-11/12 flex flex-col mx-auto">
                        <p className="font-extralight text-[17px]">Berita</p>
                        <h2 className="text-ellipsis overflow-clip text-nowrap text-[20px] font-extrabold h-8 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed velit nemo consectetur facere impedit enim at quisquam eius eum assumenda.</h2>
                        <p className="h-[110px] mt-1 text-[18px] overflow-hidden text-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sint perferendis vitae corporis quia voluptatibus! Atque iure quam perspiciatis voluptas officiis sed animi praesentium nulla esse ex molestiae, minus laboriosam porro quos voluptatum? Doloremque deleniti laboriosam sunt labore eum dolor, numquam laudantium, iste esse quisquam praesentium totam? Doloremque similique sapiente et! Aliquam, accusamus et! Animi, dolorum assumenda sint veniam molestiae enim. Fuga nihil minima ipsam facilis sit ab perspiciatis placeat rem at voluptatem fugit ut explicabo dolor iusto inventore dolores quaerat necessitatibus sunt quos, molestias perferendis animi. Tempora explicabo sint eaque, blanditiis quod quo eius modi iure, iste praesentium dolore!</p>
                        <p className="mt-3 text-[18px] overflow-hidden h-7 text-ellipsis font-bold">20/20/20</p>
                    </span>
                </div>
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