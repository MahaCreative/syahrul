import Guest from "@/Layouts/GuestLayout";
import { Link, router, usePage } from "@inertiajs/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "animate.css/animate.compat.css";
import ScrollAnimation from "react-animate-on-scroll";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    ArrowBack,
    Facebook,
    Instagram,
    RemoveRedEye,
    ShoppingBag,
} from "@mui/icons-material";
import CurrencyInput from "react-currency-input-field";
import { Tooltip, debounce } from "@mui/material";
import DaftarPaket from "./DaftarPaket/DaftarPaket";
export default function Home(props) {
    const paket = props.paket;
    const kategori = props.kategori;
    const [load, setLoad] = useState({ load: 8, kategori_id: "" });
    const ulasan = props.ulasan;
    const team = props.team;
    let sliderRef = useRef(null);
    const { studio } = usePage().props;
    const paketRef = useRef(null);
    const itemPaketRef = useRef(null);
    const teamRef = useRef(null);

    const [currentSlide, setCurrentSlide] = useState(0);

    const [nextSlide, setNextSlide] = useState(currentSlide);
    var settings = {
        infinite: true,
        lazyLoad: true,
        arrows: false,

        slidesToShow: ulasan.length < 3 ? ulasan.length : 3,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        centerMode: true, // Mengaktifkan centerMode
        centerPadding: "0", // Set padding di tengah menjadi 0
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                    centerPadding: "40px",
                },
            },
        ],

        beforeChange: (current) => setCurrentSlide(current + 1),
    };

    const reloadLoad = useCallback(
        debounce((query) => {
            router.get(route("home"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reloadLoad(load), [load]);
    return (
        <div className="w-full overflow-x-hidden">
            <DaftarPaket paket={paket} kategori={kategori} />

            {team && (
                <div className="">
                    {team.map((item, key) => (
                        <ScrollAnimation
                            key={key}
                            className="flex flex-col md:flex-row even:md:flex-row-reverse transition-all duration-300 ease-in-out"
                            animateIn={`${
                                key % 2 == 1 ? "fadeInRight" : "fadeInLeft"
                            } `}
                            animateOut={`${
                                key % 2 == 1 ? "fadeInRight" : "fadeInLeft"
                            } `}
                            delay={key * 100}
                        >
                            <img
                                className=" w-full object-cover"
                                src={"/storage/" + item.foto}
                                alt=""
                            />
                            <div
                                className={`${
                                    key % 2 == 1 ? "bg-orange-500" : "bg-white"
                                } w-full  py-8`}
                            >
                                <div className="px-16">
                                    <h3
                                        className={`${
                                            key % 2 == 1
                                                ? "text-white"
                                                : "text-orange-500"
                                        } capitalize  text-3xl lg:text-5xl font-semibold transition-all duration-300 ease-in-out`}
                                    >
                                        {item.nama}
                                    </h3>
                                    <p
                                        className={`${
                                            key % 2 == 1
                                                ? "text-white"
                                                : "text-orange-500"
                                        } italic  mt-2 capitalize font-light text-2xl md:text-3xl transition-all duration-300 ease-in-out`}
                                    >
                                        {item.posisi}
                                    </p>
                                    <p
                                        className={`${
                                            key % 2 == 1
                                                ? "text-white"
                                                : "text-black"
                                        } py-4 text-xl font-normal transition-all duration-300 ease-in-out`}
                                        dangerouslySetInnerHTML={{
                                            __html: item.deskripsi,
                                        }}
                                    />
                                    <div
                                        className={`${
                                            key % 2 == 1
                                                ? " text-white"
                                                : "text-orange-500"
                                        } flex items-center gap-6`}
                                    >
                                        <a
                                            href={item.link_facebook_studio}
                                            className="flex gap-3 text-base lg:text-2xl"
                                        >
                                            <Facebook
                                                color="inherit"
                                                fontSize="large"
                                            />{" "}
                                            {item.facebook_studio}
                                        </a>
                                        <a
                                            href={item.link_instagram_studio}
                                            className="flex gap-3 text-base lg:text-2xl"
                                        >
                                            <Instagram
                                                color="inherit"
                                                fontSize="large"
                                            />{" "}
                                            {item.instagram_studio}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            )}
            {ulasan && (
                <div className="py-16">
                    <h3 className="text-orange-500 text-center text-4xl font-bold tracking-tighter">
                        Ulasan Pelanggan Kami
                    </h3>
                    <p className="text-white text-center mb-4  text-xl md:text-3xl font-light">
                        {studio.nama_studio + " " + studio.tagline}
                    </p>
                    <Slider
                        ref={(slider) => {
                            sliderRef = slider;
                        }}
                        {...settings}
                    >
                        {ulasan.map((item, key) => (
                            <div
                                key={key}
                                className={`${
                                    key === currentSlide &&
                                    "bg-orange-500 shadow-sm shadow-gray-500 z-10 scale-115"
                                } transition-all duration-1000 ease-in-out py-16 px-8 rounded-md text-white `}
                            >
                                <div className="flex gap-4 items-center">
                                    <div className="border-b border-dashed border-white rounded-full overflow-hidden p-2">
                                        <img
                                            className="w-[100px] rounded-full object-cover"
                                            src={"/storage/" + item.foto}
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <p className="w-full capitalize text-3xl font-bold tracking-tighter">
                                            {item.nama}
                                        </p>
                                    </div>
                                </div>
                                <p>{item.ulasan}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
}

Home.layout = (page) => (
    <Guest children={page} title={"Beranda"} about={true} />
);
