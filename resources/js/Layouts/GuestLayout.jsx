import InputText from "@/Components/InputText";
import MenuLink from "@/Components/Pelanggan/MenuLink";
import StyledRating from "@/Components/StyledRating";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Facebook, Instagram, Shop, ShoppingCart } from "@mui/icons-material";
import { Badge, Input, Rating, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Slide, Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Swal from "sweetalert2";
export default function Guest({ children, title }) {
    const { auth } = usePage().props;
    const { cart } = usePage().props;
    const { studio } = usePage().props;
    const { slider } = usePage().props;
    const topRef = useRef(null);
    const { data, setData, post, reset, errors } = useForm({
        nama: "",
        foto: "",
        rating: 1,
        ulasan: "",
    });
    const [isScrolled, setIsScrolled] = useState(false);
    const divStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        height: "100%",
    };
    useEffect(() => {
        const handleScroll = () => {
            const rect = topRef.current.getBoundingClientRect();

            if (rect.top < -250) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isScrolled]);
    const submitUlasan = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Kirim Ulasan?",
            text: "Apakah anda yakin ingin mengirim ulasan anda?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Kirim ulasan!",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("store-ulasan-studio"), {
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "success",
                            text: "Ulasan anda berhasil dikirim. terimakasih telah memberi ulasan",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    return (
        <div ref={topRef} className="font-oswald bg-black">
            <Head title={title} />
            {/* Navbar web */}

            <div
                className={`${
                    isScrolled
                        ? "fixed z-[99] bg-black/50 backdrop-blur-sm"
                        : "relative bg-black "
                } w-full py-3 flex justify-between px-8 lg:px-16 items-center transition-all duration-300 py-3"`}
            >
                <h3 className="capitalize text-white text-4xl font-bold tracking-tighter italic">
                    {studio.nama_studio}
                </h3>
                <div className="flex gap-3">
                    <MenuLink
                        link={route("home")}
                        active={route().current("home")}
                        title={"Home"}
                    />
                    <MenuLink
                        link={route("daftar-paket")}
                        active={route().current("daftar-paket")}
                        title={"Daftar Paket"}
                    />
                    <MenuLink
                        link={route("galery")}
                        active={route().current("galery")}
                        title={"Galery"}
                    />

                    {auth.user ? (
                        <>
                            <MenuLink
                                link={route("profil_saya")}
                                active={route().current("profil_saya")}
                                title={"Profil Saya"}
                            />
                            <MenuLink
                                link={route("pesanan_saya")}
                                active={route().current("pesanan_saya")}
                                title={"Pesanan Saya"}
                            />
                            {cart.kd_pesanan && (
                                <Link
                                    href={route(
                                        "show_pesanan_saya",
                                        cart.kd_pesanan
                                    )}
                                    className="text-white hover:text-orange-500 duration-300 ease-in-out transition-all"
                                >
                                    <Badge
                                        badgeContent={cart.count}
                                        color="primary"
                                    >
                                        <ShoppingCart
                                            color="inherit"
                                            fontSize="large"
                                        />
                                    </Badge>
                                </Link>
                            )}
                            <MenuLink
                                link={route("logout")}
                                active={route().current("logout")}
                                title={"logout"}
                            />
                        </>
                    ) : (
                        <>
                            <MenuLink
                                link={route("login")}
                                active={route().current("login")}
                                title={"Login"}
                            />
                            <MenuLink
                                link={route("register")}
                                active={route().current("register")}
                                title={"Register"}
                            />
                        </>
                    )}
                </div>
            </div>
            {/* Navbar Mobile */}

            {/* container */}
            {/* Slider */}
            {slider && (
                <Slide>
                    {slider.map((item, index) => (
                        <div className=" h-[90vh]" key={index}>
                            <div
                                className="relative h-full"
                                style={{
                                    ...divStyle,
                                    backgroundImage: `url(/storage/${item.foto})`,
                                }}
                            >
                                <div
                                    className="absolute left-0 top-0 w-full h-full bg-black/30
                                "
                                ></div>
                                <div
                                    className={`relative z-10 w-full h-full flex px-8 items-center md:px-16 ${
                                        item.position == "right"
                                            ? "justify-start text-left"
                                            : item.position == "center"
                                            ? "justify-center text-center"
                                            : "justify-end text-right"
                                    }  `}
                                >
                                    <div className="w-[90%] md:w-[50%] py-3  ">
                                        <p className="text-white text-3xl lg:text-7xl font-bold transition-all duration-300 ease-in-out">
                                            {item.title}
                                        </p>
                                        <p className="text-white text-sm lg:text-2xl font-light transition-all duration-300 ease-in-out">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slide>
            )}
            <div></div>
            {/* Sejarah */}
            <div className=" bg-black py-6">
                <div className="py-16 text-white px-4 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-between items-start gap-3 ">
                    <ScrollAnimation
                        animateIn={`fadeInUp`}
                        animateOut={`fadeInUp`}
                        delay={100}
                        className="w-full  flex flex-col h-full py-2 px-2 rounded-md shadow-sm shadow-gray-500/50 transition-all duration-300 ease-in-out"
                    >
                        <div className="w-full py-6 flex justify-end">
                            <img
                                src={"/storage/" + studio.foto_studio}
                                alt=""
                                className="w-full  object-cover object-center"
                            />
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation
                        animateIn={`fadeInUp`}
                        animateOut={`fadeInUp`}
                        delay={200}
                        className="w-full "
                    >
                        <p className="text-orange-500 text-4xl my-3 border-b-4 border-orange-500 inline-block">
                            About Me
                        </p>
                        <h3 className="capitalize text-4xl md:text-5xl lg:text-7xl font-medium leading-none mb-3 tracking-tighter text-orange-500 ">
                            {studio.nama_studio + " " + studio.tagline}
                        </h3>
                        <p
                            className="text-xl font-light "
                            dangerouslySetInnerHTML={{
                                __html: studio.deskripsi_studio,
                            }}
                        />
                        <div className="my-3 text-lg font-medium text-orange-500 flex gap-3 items-center">
                            <Link
                                as="a"
                                href={studio.link_facebook_studio}
                                className="flex gap-3"
                            >
                                <span>
                                    <Facebook
                                        color="inherit"
                                        fontSize="large"
                                    />{" "}
                                </span>
                                <span>{studio.facebook_studio}</span>
                            </Link>
                            <Link
                                as="a"
                                target="_blank"
                                href={studio.link_instagram_studio}
                                className="flex gap-3"
                            >
                                <span>
                                    <Instagram
                                        color="inherit"
                                        fontSize="large"
                                    />{" "}
                                </span>
                                <span>{studio.instagram_studio}</span>
                            </Link>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
            {children}
            {/* Footer */}
            <div
                className="bg-black
py-16 px-4 md:px-8 lg:px-16"
            >
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="w-full lg:border-r lg:border-b-0 border-b border-r-0 border-white/40 ">
                        <h3 className="text-orange-500 font-bold text-4xl capitalize">
                            {studio.nama_studio}
                        </h3>
                        <p className="mt-6 text-white font-normal text-base">
                            {studio.deskripsi_studio}
                        </p>
                        <div className="mt-6 text-white font-light text-base">
                            <p className="flex gap-9">
                                <span>Alamat </span>
                                <span>{studio.alamat_studio}</span>
                            </p>
                            <p className="flex gap-9">
                                <span>Email </span>
                                <span>{studio.email_studio}</span>
                            </p>
                            <p className="flex gap-9">
                                <span>Telp </span>
                                <span>{studio.telp_studio}</span>
                            </p>
                            <div className="flex  gap-6 mt-6 ">
                                <Link className="text-orange-500 font-light text-2xl">
                                    <Facebook
                                        color="inherit"
                                        fontSize="large"
                                    />{" "}
                                    {studio.facebook_studio}
                                </Link>
                                <Link className="text-orange-500 font-light text-2xl">
                                    <Instagram
                                        color="inherit"
                                        fontSize="large"
                                    />{" "}
                                    {studio.instagram_studio}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full  px-4">
                        <h3 className="text-orange-500 font-bold text-4xl capitalize">
                            Link Website
                        </h3>
                        <div className="mt-6 flex flex-col gap-3">
                            <MenuLink
                                link={route("home")}
                                active={route().current("home")}
                                title={"Home"}
                            />
                            <MenuLink
                                link={route("daftar-paket")}
                                active={route().current("daftar-paket")}
                                title={"Daftar Paket"}
                            />
                            <MenuLink
                                link={route("galery")}
                                active={route().current("galery")}
                                title={"Galery"}
                            />

                            {auth.user ? (
                                <>
                                    <MenuLink
                                        link={route("profil_saya")}
                                        active={route().current("profil_saya")}
                                        title={"Profil Saya"}
                                    />
                                    <MenuLink
                                        link={route("pesanan_saya")}
                                        active={route().current("pesanan_saya")}
                                        title={"Pesanan Saya"}
                                    />
                                    {cart.kd_pesanan && (
                                        <Link
                                            href={route(
                                                "show_pesanan_saya",
                                                cart.kd_pesanan
                                            )}
                                            className="text-white hover:text-orange-500 duration-300 ease-in-out transition-all"
                                        >
                                            <Badge
                                                badgeContent={cart.count}
                                                color="primary"
                                            >
                                                <ShoppingCart
                                                    color="inherit"
                                                    fontSize="large"
                                                />
                                            </Badge>
                                        </Link>
                                    )}
                                    <MenuLink
                                        link={route("logout")}
                                        active={route().current("logout")}
                                        title={"logout"}
                                    />
                                </>
                            ) : (
                                <>
                                    <MenuLink
                                        link={route("login")}
                                        active={route().current("login")}
                                        title={"Login"}
                                    />
                                    <MenuLink
                                        link={route("register")}
                                        active={route().current("register")}
                                        title={"Register"}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="py-16">
                    <h3 className="text-orange-500 font-bold text-4xl capitalize">
                        Ulasan
                    </h3>
                    <p
                        className="mt-6 text-white font-normal text-2xl md:text-3xl w-full md:w-1/2 transition-all
                     duration-300 ease-in-out"
                    >
                        Kami sangat senang jika anda ingin meninggalkan ulasan
                        terhadap pelayanan yang kami berikan melalui form
                        dibawah ini.
                    </p>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={submitUlasan}
                    >
                        <InputText
                            title={"Nama "}
                            name={"nama"}
                            errors={errors.nama}
                            value={data.nama}
                            onChange={(e) =>
                                setData({ ...data, nama: e.target.value })
                            }
                            className="w-full bg-white rounded-md my-2"
                        />
                        <InputText
                            multiline
                            maxRows={4}
                            className="w-full bg-white rounded-md my-2"
                            name={"Ulasan"}
                            title={"Berikan ulasan terbaik anda"}
                            errors={errors.ulasan}
                            value={data.ulasan}
                            onChange={(e) =>
                                setData({ ...data, ulasan: e.target.value })
                            }
                        />
                        <InputText
                            title={"Foto  "}
                            type="file"
                            name={"foto"}
                            errors={errors.foto}
                            onChange={(e) =>
                                setData({ ...data, foto: e.target.files[0] })
                            }
                            className="w-full bg-white rounded-md my-2"
                        />
                        <div className="my-6">
                            {" "}
                            <StyledRating
                                errors={errors.rating}
                                value={data.rating}
                                defaultValue={1}
                                name="simple-controlled"
                                onChange={(event, newValue) => {
                                    setData({ ...data, rating: newValue });
                                }}
                            />
                        </div>
                        <button className="my-6 rounded-xl bg-orange-500 font-bold text-2xl text-white py-2 px-4">
                            Kirim Ulasan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
