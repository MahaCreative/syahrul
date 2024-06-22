import { useEffect, useRef, useState } from "react";

import { Head, Link, usePage } from "@inertiajs/react";
import {
    Favorite,
    Group,
    Home,
    List,
    LockClock,
    Payment,
    PictureInPicture,
    Settings,
    ShoppingCart,
    UTurnLeftSharp,
    Widgets,
} from "@mui/icons-material";
import MenuAdmin from "@/Components/MenuAdmin";

export default function Authenticated({ children, title }) {
    const [openSidebar, setOpenSidebar] = useState(false);
    const sidbearRef = useRef();
    const { studio } = usePage().props;
    const handleClickOutside = (event) => {
        if (sidbearRef.current && !sidbearRef.current.contains(event.target)) {
            setOpenSidebar(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 relative">
            {/* narbar logo */}
            <Head title={title} />
            <div className="bg-black py-2 px-16 w-full relative z-[99999]">
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => setOpenSidebar(true)}
                        className="focus:bg-orange-500 py-2 px-3 hover:bg-orange-500 text-white duration-300 ease-in-out transition-all"
                    >
                        <Widgets color="inherit" fontSize="inherit" />
                    </button>
                    <h3 className="text-white font-bold text-3xl">
                        {studio.nama_studio}
                    </h3>
                </div>
            </div>
            {/* Sidebar mobile */}
            <div
                ref={sidbearRef}
                className="flex  w-full absolute z-[9999] top-12
            "
            >
                <div
                    className={`${
                        openSidebar ? "translate-x-0" : "-translate-x-full"
                    } h-screen w-[80%] md:w-1/2 lg:w-1/4 bg-black  left-0 top-0 py-12 fixed transform duration-300 ease-in-out transition-all `}
                >
                    <div className="relative py-2 ">
                        <MenuAdmin
                            active={route().current("home")}
                            title={"Home"}
                            href={route("home")}
                            icon={<Home color="inherit" fontSize="inherit" />}
                        />
                        <MenuAdmin
                            active={route().current("dashboard")}
                            title={"Dashboard"}
                            href={route("dashboard")}
                            icon={
                                <Widgets color="inherit" fontSize="inherit" />
                            }
                        />

                        <p className="border-b border-orange-500 text-white font-light px-8 my-3">
                            Master Data
                        </p>
                        <MenuAdmin
                            active={route().current("admin.profile_studio")}
                            title={"Atur Profile Studio"}
                            href={route("admin.profile_studio")}
                            icon={
                                <Settings color="inherit" fontSize="inherit" />
                            }
                        />
                        <MenuAdmin
                            active={route().current("admin.profile-admin")}
                            title={"Profile Saya"}
                            href={route("admin.profile-admin")}
                            icon={
                                <Settings color="inherit" fontSize="inherit" />
                            }
                        />
                        <MenuAdmin
                            active={route().current("admin.kelola_admin")}
                            title={"Kelola User"}
                            href={route("admin.kelola_admin")}
                            icon={<Group color="inherit" fontSize="inherit" />}
                        />
                        <MenuAdmin
                            active={route().current("admin.kelola_team")}
                            title={"Kelola Team"}
                            href={route("admin.kelola_team")}
                            icon={<Group color="inherit" fontSize="inherit" />}
                        />
                        <MenuAdmin
                            active={route().current("admin.kelola_galery")}
                            title={"Kelola Galery"}
                            href={route("admin.kelola_galery")}
                            icon={
                                <PictureInPicture
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            }
                        />
                        <MenuAdmin
                            active={route().current("admin.kelola_slidery")}
                            title={"Kelola Slider"}
                            href={route("admin.kelola_slider")}
                            icon={
                                <PictureInPicture
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            }
                        />
                        <MenuAdmin
                            active={route().current("admin.kelola-jadwal")}
                            title={"Kelola Jadwal"}
                            href={route("admin.kelola-jadwal")}
                            icon={
                                <LockClock color="inherit" fontSize="inherit" />
                            }
                        />
                        <MenuAdmin
                            active={route().current("admin.kelola-kategori")}
                            title={"Kelola Kategori"}
                            href={route("admin.kelola-kategori")}
                            icon={<List color="inherit" fontSize="inherit" />}
                        />
                        <MenuAdmin
                            active={route().current(
                                "admin.kelola_paket_booking"
                            )}
                            title={"Kelola Paket Booking"}
                            href={route("admin.kelola_paket_booking")}
                            icon={<List color="inherit" fontSize="inherit" />}
                        />
                        <MenuAdmin
                            active={route().current("admin.kelola-pelanggan")}
                            title={"Kelola Pelanggan"}
                            href={route("admin.kelola-pelanggan")}
                            icon={
                                <UTurnLeftSharp
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            }
                        />
                        <MenuAdmin
                            active={route().current("admin.kelola-pelanggan")}
                            title={"Kelola Ulasan"}
                            href={route("admin.kelola-pelanggan")}
                            icon={
                                <Favorite color="inherit" fontSize="inherit" />
                            }
                        />
                        <p className="border-b border-orange-500 text-white font-light px-8 my-3">
                            Menu Transaksi
                        </p>
                        <MenuAdmin
                            active={route().current(
                                "admin.list-pesanan-paket-pelanggan"
                            )}
                            title={"List Paket Pesanan pelanggan"}
                            href={route("admin.list-pesanan-paket-pelanggan")}
                            icon={
                                <ShoppingCart
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            }
                        />
                        <MenuAdmin
                            active={route().current("admin.pesanan-pelanggan")}
                            title={"Pesanan Pelanggan"}
                            href={route("admin.pesanan-pelanggan")}
                            icon={
                                <ShoppingCart
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            }
                        />
                        <MenuAdmin
                            active={route().current(
                                "admin.pembayaran-pelanggan"
                            )}
                            title={"Pembayaran Pelanggan"}
                            href={route("admin.pembayaran-pelanggan")}
                            icon={
                                <Payment color="inherit" fontSize="inherit" />
                            }
                        />
                    </div>
                </div>
                {/* container */}
            </div>
            <div className="w-full h-full flex justify-center items-center ">
                {children}
            </div>
        </div>
    );
}
