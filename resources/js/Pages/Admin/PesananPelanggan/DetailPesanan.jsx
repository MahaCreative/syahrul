import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Dialog, Input, Modal } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import CurrencyInput from "react-currency-input-field";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import InputText from "@/Components/InputText";

export default function DetailPesanan(props) {
    const detail = props.detail;
    const pesanan = props.pesanan;
    const columns = [
        {
            name: "#",
            width: "60px",
            wrap: true,
            selector: (row, index) => index + 1,
        },
        {
            name: "Foto Paket",
            wrap: true,
            width: "130px",
            selector: (row) => (
                <img
                    src={"/storage/" + row.paket.gambar_paket}
                    alt=""
                    className="w-[90px] object-cover"
                />
            ),
        },
        {
            name: "Nama Paket",
            wrap: true,
            width: "150px",
            selector: (row) => row.paket.nama_paket,
        },
        {
            name: "Deskripsi Paket",
            wrap: true,
            width: "150px",
            selector: (row) => (
                <div>
                    <p>{row.paket.deskripsi_paket}</p>
                    <p className="text-orange-500 font-bold">
                        {row.paket.catatan_paket}
                    </p>
                </div>
            ),
        },
        {
            name: "Harga Paket",
            wrap: true,
            width: "150px",
            selector: (row) => (
                <CurrencyInput
                    prefix="Rp. "
                    value={row.paket.harga_paket}
                    className="bg-none border-none"
                    disabled
                />
            ),
        },
        {
            name: "Waktu Booking",
            wrap: true,
            width: "130px",
            selector: (row) => moment(row.tanggal_foto).format("DD-MMMM-YYYY"),
        },
        {
            name: "Jam Foto",
            wrap: true,
            width: "100px",
            selector: (row) => row.jam_foto,
        },
        {
            name: "Catatan",
            wrap: true,
            width: "120px",
            selector: (row) => row.catatan,
        },
        {
            name: "Status Pesanan Paket",
            wrap: true,
            width: "120px",
            selector: (row) => (
                <p
                    className={`${
                        row.status_pesanan_paket == "di tolak"
                            ? "text-red-500"
                            : row.status_pesanan_paket == "menunggu konfirmasi"
                            ? "text-orange-500"
                            : "text-green-500"
                    }`}
                >
                    {row.status_pesanan_paket}
                </p>
            ),
        },
        {
            name: "Aksi",
            selector: (row) =>
                (pesanan.status_pembayaran != "lunas" ||
                    pesanan.status_pesanan_paket === "di terima") && (
                    <button
                        onClick={() => konfirmasiPesanan(row)}
                        className="bg-blue-500 font-bold py-2 px-4 text-white"
                    >
                        Konfirmasi
                    </button>
                ),
            wrap: true,
        },
    ];
    const [modalKonfirmasi, setModalKonfirmasi] = useState(false);
    const [modelKonfirm, setModelKonfi] = useState(null);
    const [statusTolak, setStatusTolak] = useState(false);
    const [paramsKonfirm, setParamsKonfirm] = useState({
        status: "",
        catatan: "",
    });
    const konfirmasiPesanan = (row) => {
        setModalKonfirmasi(true);
        setModelKonfi(row);
    };
    const konfirmHandler = (status) => {
        setParamsKonfirm({ ...paramsKonfirm, status: status });

        if (status == "di tolak") {
            setStatusTolak(true);
        } else {
            setStatusTolak(false);

            Swal.fire({
                title: "Konfirmasi Pesanan",
                text: `Apakah pesanan pelanggan ini diterima?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya Diterima",
                cancelButtonText: "Batalkan Konfirmasi",
                allowOutsideClick: false,
                zIndex: 9999,
            }).then((result) => {
                if (result.isConfirmed) {
                    router.post(
                        route("create.konfirmasi-pesanan-paket-booking"),
                        { modelKonfirm, paramsKonfirm },
                        {
                            onError: (err) => {
                                Swal.fire({
                                    position: "center",
                                    title: "Gagal mengkonfirmasi pesanan",
                                    text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                                    icon: "error",
                                    timer: 1500,
                                });
                            },
                            onSuccess: () => {
                                Swal.fire({
                                    position: "center",
                                    title: "Sukses",
                                    text: "Berhasil mengkonfirmasi pesanan",
                                    icon: "success",
                                    timer: 1500,
                                });
                                reset();
                                onClose(false);
                                setModel(null);
                            },
                            preserveScroll: true,
                        }
                    );
                } else {
                    onClose(false);
                }
            });
        }
    };
    const kirimCatatnPenolakan = (e) => {
        e.preventDefault();
        console.log(status);
        Swal.fire({
            title: "Konfirmasi Pesanan",
            text: `Apakah pesanan pelanggan ini ditolak?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya Ditolak",
            cancelButtonText: "Batalkan Konfirmasi",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("create.konfirmasi-pesanan-paket-booking"),
                    { modelKonfirm, paramsKonfirm },
                    {
                        onError: (err) => {
                            Swal.fire({
                                position: "center",
                                title: "Gagal mengkonfirmasi pesanan",
                                text: err.error,
                                icon: "error",
                                timer: 1500,
                            });
                            console.log(err);
                        },
                        onSuccess: () => {
                            Swal.fire({
                                position: "center",
                                title: "Sukses",
                                text: "Berhasil mengkonfirmasi pesanan",
                                icon: "success",
                                timer: 1500,
                            });
                            reset();
                            onClose(false);
                            setModel(null);
                        },
                        preserveScroll: true,
                    }
                );
            } else {
                onClose(false);
            }
        });
    };

    return (
        <div className="py-16 px-4 md:px-8 lg:px-16">
            <Modal
                style={{ zIndex: 999 }}
                open={modalKonfirmasi}
                onClose={() => {
                    setModalKonfirmasi(false);
                    setModelKonfi(null);
                }}
            >
                <div className="px-8 md:px-16 lg:px-24 w-full h-full flex overflow-y-auto justify-center items-center">
                    <div className="w-1/2 bg-white py-6 px-4 rounded-md  max-h-[90vh] overflow-y-auto">
                        <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                            Konfirmasi Pesanan {modelKonfirm?.nama_paket}
                        </h3>
                        <p>
                            Silahkan melakukan konfirmasi pesanan pelanggan,
                            jika pesanan pada paket ini diterima silahkan
                            menekan tombol terima. Pesanan yang statusnya di
                            tolak akan membuat pelanggan tidak dapat melakukan
                            pembayaran. Jika pembayaran di tolak Sertakan alasan
                            mengapa pesanannya ditolak
                        </p>
                        <div className="flex py-3 gap-3">
                            <button
                                onClick={() => konfirmHandler("di tolak")}
                                className="bg-red-500 hover:bg-red-500 transition-all duration-300 ease-in-out py-2 px-3 font-bold text-white"
                            >
                                Pesanan Di Tolak
                            </button>
                            <button
                                onClick={() => konfirmHandler("di terima")}
                                className="bg-green-500 hover:bg-green-500 transition-all duration-300 ease-in-out py-2 px-3 font-bold text-white"
                            >
                                Pesanan Di Terima
                            </button>
                            <button
                                onClick={() => {
                                    setModalKonfirmasi(false);
                                    setModelKonfi(null);
                                }}
                                className="bg-red-500 hover:bg-red-500 transition-all duration-300 ease-in-out py-2 px-3 font-bold text-white"
                            >
                                Batalkan konfrimasi
                            </button>
                        </div>
                        {statusTolak && (
                            <form
                                onSubmit={kirimCatatnPenolakan}
                                className="my-3 w-full"
                            >
                                <p className="text-xs text-red-500 italic">
                                    *Penolakan Pesanan wajib disertai dengan
                                    alasan kenapa pesanan ditolak. dan berikan
                                    solusi agar pesanan dapat di terima
                                </p>
                                <InputText
                                    onChange={(e) =>
                                        setParamsKonfirm({
                                            ...paramsKonfirm,
                                            catatan: e.target.value,
                                        })
                                    }
                                    title={"Catatan Penolakan"}
                                    className="w-full"
                                />
                                <button className="mt-3 bg-blue-500 hover:bg-blue-500 transition-all duration-300 ease-in-out py-2 px-3 font-bold text-white">
                                    Kirim Catatan penolakan
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </Modal>
            <div className="rounded-md bg-white py-3 px-4">
                <div className="flex justify-between items-center">
                    <div className="flex justify-center w-full">
                        <h3 className="text-center text-5xl text-red-500 font-bold">
                            {moment(pesanan.tgl_pesanan)
                                .add(2, "days")
                                .format("DD-MMMM-YYYY")}
                        </h3>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-end w-full gap-4">
                        <div className="text-left md:text-right w-full">
                            <h3 className="text-orange-500 text-sm md:text-base lg:text-xl ">
                                Kode Pesanan : {pesanan.kd_pesanan}
                            </h3>
                            <h3 className="text-md md:text-md font-light ">
                                Tanggal pesanan :{" "}
                                {moment(pesanan.tanggal_pesanan).format(
                                    "DD-MMMM-YYYY"
                                )}
                            </h3>
                            <h3
                                className={`${
                                    pesanan.status_pemesanan == "di batalkan"
                                        ? "text-red-500"
                                        : pesanan.status_pemesanan ==
                                          "belum selesai"
                                        ? ""
                                        : "text-green-500"
                                } text-md md:text-md font-light `}
                            >
                                Status Pesanan : {pesanan.status_pemesanan}
                            </h3>
                            <h3
                                className={`${
                                    pesanan.status_pembayaran == "belum lunas"
                                        ? "text-red-500"
                                        : pesanan.status_pembayaran == "pending"
                                        ? "text-orange-500"
                                        : "text-green-500"
                                } text-md md:text-md font-light `}
                            >
                                Status Pembayaran : {pesanan.status_pembayaran}
                            </h3>
                        </div>
                        <div className="md:w-full w-full">
                            <div className="flex gap-3  border px-2 border-orange-500 bg-orange-500 text-white">
                                <h3>
                                    Total Harga :{" "}
                                    <CurrencyInput
                                        prefix="Rp. "
                                        className="bg-inherit border-none"
                                        value={pesanan.total_pembayaran}
                                        disabled
                                    />
                                </h3>
                            </div>
                            {pesanan.status_pembayaran !== "lunas" && (
                                <div className="my-3">
                                    <button
                                        onClick={() => batalKanPesanan(pesanan)}
                                        className="bg-red-500 text-white py-2 px-4 text-center w-full"
                                    >
                                        Batalkan Pesanan
                                    </button>
                                    {pesanan.aktif_payment == "ya" && (
                                        <button
                                            onClick={() => checkout(pesanan)}
                                            className="bg-blue-500 text-white my-2 py-2 px-4 text-center w-full"
                                        >
                                            Bayar Sekarang
                                        </button>
                                    )}
                                </div>
                            )}
                            {pesanan.status_pembayaran == "lunas" && (
                                <Link
                                    href={route(
                                        "invoice_pesanan",
                                        pesanan.kd_pesanan
                                    )}
                                    as="button"
                                    className="bg-blue-500 text-white py-2 px-4 w-full mt-3"
                                >
                                    Lihat Invoice
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <DataTable data={detail} columns={columns} />
            </div>
        </div>
    );
}
DetailPesanan.layout = (page) => (
    <Authenticated children={page} title={"Detail Pesanan Pelanggan"} />
);
