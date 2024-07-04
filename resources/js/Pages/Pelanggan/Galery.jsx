import Guest from "@/Layouts/GuestLayout";
import { usePage } from "@inertiajs/react";
import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

export default function Galery(props) {
    const { studio } = usePage().props;
    const galery = props.galery;
    return (
        <div>
            <div className="my-6">
                <h3 className="text-orange-500 text-center text-4xl font-bold tracking-tighter">
                    Galery
                </h3>
                <p className="text-white text-center mb-4  text-xl md:text-3xl font-light">
                    {studio.nama_studio + " " + studio.tagline}
                </p>
                {Galery.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {galery.map((item, key) => (
                            <ScrollAnimation
                                key={key}
                                className="relative hover:cursor-pointer  py-2 ease-out transition-all mt-16 duration-300 hover:even:bg-orange-500  odd:hover:bg-orange-700/50      px-3 h-[500px]  even:bg-white rounded-xl flex items-start justify-center flex-col"
                                animateIn={`${
                                    key % 2 == 1 ? "fadeInDown" : "fadeInUp"
                                } `}
                                animateOut={`${
                                    key % 2 == 1 ? "fadeInDown" : "fadeInUp"
                                } `}
                                delay={key * 100}
                            >
                                <img src={"/storage/" + item.foto} alt="" />
                                <p className="text-white text-left text-xl font-bold tracking-tighter">
                                    Nama Pelanggan : {item.nama_pelanggan}
                                </p>
                                <p className="text-white text-sm font-light tracking-tighter">
                                    {item.tanggal_foto}
                                </p>
                                <p className="text-white text-sm font-light tracking-tighter">
                                    Taken By: {item.taken_by}
                                </p>
                            </ScrollAnimation>
                        ))}
                    </div>
                ) : (
                    <p className="text-white text-center text-3xl my-3 font-bold">
                        Belum ada galery yang di tambahkan
                    </p>
                )}
            </div>
        </div>
    );
}
Galery.layout = (page) => (
    <Guest children={page} title={"Galery"} about={false} />
);
