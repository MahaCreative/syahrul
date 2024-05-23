import InputText from "@/Components/InputText";
import Guest from "@/Layouts/GuestLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { RemoveRedEye, ShoppingBag } from "@mui/icons-material";
import {
    Dialog,
    Input,
    MenuItem,
    Select,
    Tooltip,
    debounce,
} from "@mui/material";
import { data } from "autoprefixer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import CurrencyInput from "react-currency-input-field";

import Swal from "sweetalert2";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import moment from "moment";

export default function DaftarPaket(props) {
    const itemPaketRef = useRef(null);
    const paket = props.paket;
    const { studio } = usePage().props;
    const [params, setParams] = useState({ status: "", cari: "", lokasi: "" });
    const [modalView, setModalView] = useState(false);
    const [modalForm, setModalForm] = useState(false);
    const [model, setModel] = useState([null]);
    const viewHandler = (value) => {
        setModel(value);
        setModalView(true);
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route("daftar-paket"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    const booking = (value) => {
        setModalView(false);
        Swal.fire({
            title: `Booking ${value.nama_paket}`,
            text: `Apakah anda ingin booking paket ${value.nama_paket}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Booking Sekarang",
        }).then((result) => {
            if (result.isConfirmed) {
                setModalView(false);
                setModel(value);
                setTimeout(() => {
                    setModalForm(true);
                }, 1000);
            }
        });
    };
    const { data, setData, post, reset, errors } = useForm({
        tanggal_foto: new Date(),
        paket_id: "",
        jam_foto: "",
        catatan: "",
    });
    const submitPesanan = (e) => {
        e.preventDefault();
        setData({ ...data, paket_id: model.id });

        setModalForm(false);
        Swal.fire({
            title: `Booking ${model.nama_paket}`,
            text: `Apakah anda ingin booking paket ${
                model.nama_paket
            } pada Tanggal ${moment(data.tanggal_foto).format("d-m-Y")} Jam : ${
                data.jam_foto
            }`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Booking Sekarang",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("add_cart"), {
                    onError: (errors) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal melakukan booking",
                            text: errors.message
                                ? errors.message
                                : "Terdapat kesalahan saat melakukan booking, silahkan cek isian anda",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menambah booking pesanan",
                            icon: "success",
                            timer: 1500,
                        });
                    },
                    preserveScroll: true,
                });
            } else if (result.dismiss) {
                setModalForm(true);
            }
        });
    };
    useEffect(() => {
        setData({ ...data, paket_id: model ? model.id : "" });
    }, [model]);
    return (
        <div className="py-16 px-4 md:px-16 lg:px-24">
            {/* Modal */}
            <div className="w-full">
                <Dialog
                    maxWidth={"lg"}
                    className="w-full"
                    open={modalView}
                    onClose={() => {
                        setModel([null]);
                        setModalView(false);
                    }}
                >
                    <div className="bg-white py-2 px-4 transition-all duration-300 ease-in-out w-[60vw]">
                        <h3 className="font-bold text-xl text-orange-500 capitalize tracking-tighter">
                            {model.nama_paket}
                        </h3>
                        <div className="">
                            <img
                                src={"/storage/" + model.gambar_paket}
                                className="md:h-[440px] w-full object-cover object-center duration-300 transition-all ease-in-out"
                                alt=""
                            />
                            <h3 className="font-medium text-orange-500 text-xl my-3">
                                Keterangan Paket
                            </h3>
                            <p className="text-lg">{model.deskripsi_paket}</p>
                            <h3 className="font-medium text-orange-500 text-xl my-3">
                                Catatan:
                            </h3>
                            <p className="text-lg">{model.catatan_paket}</p>
                            <h3 className="font-medium text-orange-500 text-xl my-3">
                                Status Pemesanan Paket
                            </h3>
                            <p
                                className={`${
                                    model.aktif_paket == 1
                                        ? "text-orange-500"
                                        : "text-orange-500"
                                } text-lg`}
                            >
                                {model.aktif_paket == 1
                                    ? "Paket Tersedia"
                                    : "Paket Tidak Tersedia Saat Ini"}
                            </p>
                            <div className="my-3">
                                <CurrencyInput
                                    className="text-orange-500 font-semibold text-2xl bg-inherit border-none hover:cursor-default"
                                    disabled={true}
                                    prefix="Rp. "
                                    value={model.harga_paket}
                                />
                            </div>
                            {model.aktif_paket == 1 ? (
                                <button
                                    onClick={() => booking(model)}
                                    className="w-full bg-orange-500 py-2 px-4 text-white rounded-md text-center hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-linear"
                                >
                                    Booking Sekarang
                                </button>
                            ) : (
                                <div className="bg-red-500 py-2 px-4 text-white rounded-md text-center hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-linear">
                                    Paket Tidak Dapat Di Pesan Sekarang
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    maxWidth={"w-[90vw]"}
                    open={modalForm}
                    onClose={() => {
                        setModel([null]);
                        setModalForm(false);
                    }}
                >
                    <div className="bg-white  gap-3 py-8 w-full md:w-[80vw] flex flex-col lg:flex-row  px-4 transition-all duration-300 ease-in-out">
                        <div className="w-full">
                            <h3 className="font-bold text-xl text-orange-500 capitalize tracking-tighter">
                                {model.nama_paket}
                            </h3>
                            <div className="">
                                <img
                                    src={"/storage/" + model.gambar_paket}
                                    className="h-[240px] w-full object-cover"
                                    alt=""
                                />
                                <h3 className="font-medium text-orange-500 text-xl my-3">
                                    Keterangan Paket
                                </h3>
                                <p className="text-lg">
                                    {model.deskripsi_paket}
                                </p>
                                <h3 className="font-medium text-orange-500 text-xl my-3">
                                    Catatan:
                                </h3>
                                <p className="text-lg">{model.catatan_paket}</p>
                                <h3 className="font-medium text-orange-500 text-xl my-3">
                                    Status Pemesanan Paket
                                </h3>
                                <p
                                    className={`${
                                        model.aktif_paket == 1
                                            ? "text-orange-500"
                                            : "text-orange-500"
                                    } text-lg`}
                                >
                                    {model.aktif_paket == 1
                                        ? "Paket Tersedia"
                                        : "Paket Tidak Tersedia Saat Ini"}
                                </p>
                                <div className="my-3">
                                    <CurrencyInput
                                        className="text-orange-500 font-semibold text-2xl bg-inherit border-none hover:cursor-default"
                                        disabled={true}
                                        prefix="Rp. "
                                        value={model.harga_paket}
                                    />
                                </div>
                                {model.aktif_paket == 1 ? (
                                    <div className="bg-orange-500 py-2 px-4 text-white rounded-md text-center hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-linear">
                                        Booking Sekarang
                                    </div>
                                ) : (
                                    <div className="bg-red-500 py-2 px-4 text-white rounded-md text-center hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-linear">
                                        Paket Tidak Dapat Di Pesan Sekarang
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 border-l border-orange-500/40 px-3">
                            <h3 className="font-bold text-xl text-orange-500 capitalize tracking-tighter">
                                Informasi Tanggal Booking
                            </h3>
                            <form
                                onSubmit={submitPesanan}
                                className="flex flex-col gap-3 my-3 w-full"
                            >
                                <div className="w-full bg-white rounded-md overflow-hidden">
                                    <p className="my-3 text-base font-light text-orange-500">
                                        Pilih Tanggal Pemotretan
                                    </p>
                                    <Calendar
                                        className={"w-full block bg-red-200"}
                                        value={data.tanggal_foto}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                tanggal_foto: e,
                                            })
                                        }
                                    />
                                    {errors && (
                                        <p className="text-red-500 italic text-xs">
                                            {errors.tanggal_foto}
                                        </p>
                                    )}
                                    <p className="mt-3 text-base font-light text-orange-500">
                                        Pilih Jam Pemotretan
                                    </p>
                                    <Input
                                        value={data.jam_foto}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                jam_foto: e.target.value,
                                            })
                                        }
                                        type="time"
                                        className="w-full py-1 text-xl block"
                                    />
                                    {errors && (
                                        <p className="text-red-500 italic text-xs">
                                            {errors.jam_foto}
                                        </p>
                                    )}
                                    <p className="mt-3 text-base font-light text-orange-500">
                                        Tinggalkan Catatan
                                    </p>
                                    <Input
                                        value={data.catatan}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                catatan: e.target.value,
                                            })
                                        }
                                        className="w-full py-1 text-xl "
                                    />
                                </div>
                                <div className="my-3 flex gap-3">
                                    <button className="text-white py-2 px-4 rounded-md bg-orange-500">
                                        Booking Sekarang
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            reset();
                                            setModel([null]);
                                            setModalForm(false);
                                        }}
                                        className="text-white py-2 px-4 rounded-md bg-red-500"
                                    >
                                        Cancell
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Dialog>
            </div>
            <h3 className="text-orange-500 font-medium text-2xl">Cari Paket</h3>
            <div className="flex gap-3">
                <InputText
                    value={params.cari}
                    onChange={(e) =>
                        setParams({ ...params, cari: e.target.value })
                    }
                    className="bg-white rounded-md"
                    name={"cari"}
                    title={"Cari Paket"}
                />
                <Select
                    value={params.status}
                    onChange={(e) =>
                        setParams({ ...params, status: e.target.value })
                    }
                    name="status"
                    className="bg-white"
                >
                    <MenuItem value={""} selected>
                        Pilih Status Paket
                    </MenuItem>
                    <MenuItem value={1}> Bisa di pesan</MenuItem>
                    <MenuItem value={0}> Tidak bisa di pesan</MenuItem>
                </Select>
                <Select
                    value={params.lokasi}
                    onChange={(e) =>
                        setParams({ ...params, lokasi: e.target.value })
                    }
                    name="lokasi"
                    className="bg-white"
                >
                    <MenuItem value={""} selected>
                        Pilih Lokasi Foto
                    </MenuItem>
                    <MenuItem value={"studio"}> Studio</MenuItem>
                    <MenuItem value="outdor"> Outdor</MenuItem>
                </Select>
            </div>
            <div className="my-6">
                <h3 className="text-orange-500 text-center text-4xl font-bold tracking-tighter">
                    Paket Kami
                </h3>
                <p className="text-white text-center mb-4  text-xl md:text-3xl font-light">
                    {studio.nama_studio + " " + studio.tagline}
                </p>
            </div>
            <div
                ref={itemPaketRef}
                className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  transition-all duration-300 ease-in-out"
            >
                {paket.map((item, key) => (
                    <ScrollAnimation
                        key={key}
                        className="relative py-2 ease-out transition-all mt-16 duration-300 hover:even:bg-orange-500  odd:hover:bg-orange-700/50      px-3 h-[500px]  even:bg-white rounded-xl flex items-center justify-center flex-col"
                        animateIn={`${
                            key % 2 == 1 ? "fadeInDown" : "fadeInUp"
                        } `}
                        animateOut={`${
                            key % 2 == 1 ? "fadeInDown" : "fadeInUp"
                        } `}
                        delay={key * 100}
                    >
                        <img
                            src={"/storage/" + item.gambar_paket}
                            alt=""
                            className="h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-end px-8 py-4">
                            <div>
                                <h3 className=" font-medium text-xl  text-orange-500">
                                    {item.nama_paket}
                                </h3>
                                <h3 className="capitalize font-medium text-base mb-2 text-orange-500">
                                    {item.lokasi_foto}
                                </h3>
                                <p
                                    className="line-clamp-2 text-white"
                                    dangerouslySetInnerHTML={{
                                        __html: item.deskripsi_paket,
                                    }}
                                />
                                <p>
                                    <CurrencyInput
                                        prefix="Rp. "
                                        className="bg-inherit pt-6 p-0 border-none text-orange-500 text-3xl font-bold"
                                        value={item.harga_paket}
                                    />
                                </p>
                                <div className="pb-2 flex gap-3">
                                    <button
                                        onClick={() => viewHandler(item)}
                                        className="py-2  hover:cursor-pointer hover:scale-125 duration-300 ease-in-out transition-all px-2 text-white bg-orange-500/50 backdrop-blur-sm rounded-md"
                                    >
                                        <Tooltip title={"Detail Paket"}>
                                            <RemoveRedEye fontSize="inherit" />
                                        </Tooltip>
                                    </button>
                                    <button
                                        onClick={() => booking(item)}
                                        className="py-2  hover:cursor-pointer hover:scale-125 duration-300 ease-in-out transition-all px-2 text-white bg-orange-500/50 backdrop-blur-sm rounded-md"
                                    >
                                        <Tooltip title={"Booking sekarang"}>
                                            <ShoppingBag fontSize="inherit" />
                                        </Tooltip>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                ))}
            </div>
        </div>
    );
}

DaftarPaket.layout = (page) => <Guest children={page} title={"Daftar Paket"} />;
